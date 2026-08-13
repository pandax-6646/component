<template>
  <el-table
    :data="tableData"
    border
    stripe
    @sort-change="dragSort"
    :header-cell-style="{
      color: '#333',
      fontWeight: 'bold',
      backgroundColor: 'rgb(236, 245, 255)',
    }"
  >
    <template
      v-for="{
        prop,
        label,
        width,
        fixed,
        type,
        align,
        render,
        onClick,
        sort,
        buttonRender,
      } in renderCols"
      :key="prop"
    >
      <el-table-column
        :prop="prop"
        :label="label"
        :width="width || 120"
        column-key="id"
        :fixed="fixed"
        :resizable="true"
        :type="type"
        :align="align"
        :sortable="sort ? 'custom' : false"
        v-if="prop !== OPERATE_FIELD"
      >
        <template
          v-if="(render && typeof render === 'function') || (prop && !type)"
          #default="{ row }"
        >
          <div @click="onClick?.(row)" :class="onClick ? 'isLink' : ''">
            {{ emptyToDash(render?.(row) || row[prop]) }}
          </div>
        </template>
      </el-table-column>

      <el-table-column
        v-else
        column-key="id"
        :align="align"
        :width="width || 120"
        fixed="right"
      >
        <template #header>
          <el-dropdown
            :teleported="true"
            :hide-on-click="false"
            trigger="hover"
          >
            <el-button icon="operation" link class="filterBtn" />

            <template #dropdown>
              <el-dropdown-menu popper-class="dropdownWrap">
                <VueDraggable
                  v-model="filterCols"
                  :animation="150"
                  handle=".handle"
                  @end="draggerEnd"
                >
                  <el-dropdown-item
                    v-for="(item, index) in filterCols"
                    :key="index"
                  >
                    <div class="dropdownItem">
                      <div>
                        <el-checkbox
                          :label="item.label"
                          v-model="item.isChecked"
                          @change="changeHide(item)"
                        />
                      </div>
                      <div class="iconWrap">
                        <el-icon
                          :size="16"
                          class="icon"
                          :color="item.isFixed ? '#409eff' : ''"
                          @click="fixedColItem(item)"
                        >
                          <Aim />
                        </el-icon>
                        <el-icon :size="16" class="icon handle cursor-move">
                          <Rank />
                        </el-icon>
                      </div>
                    </div>
                  </el-dropdown-item>
                </VueDraggable>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </template>

        <template #default="{ row }">
          <template v-for="{ label, onClick, key } in buttonRender" :key="key">
            <el-button
              @click="() => onClick?.(row)"
              type="primary"
              size="small"
              v-if="isShowColsBtn(row, key)"
            >
              {{ label }}
            </el-button>
          </template>
        </template>
      </el-table-column>
    </template>
  </el-table>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { VueDraggable } from "vue-draggable-plus";
import { isNumber } from "lodash";
import { OPERATE_FIELD, CAN } from "@/utils/constants";
import {
  emptyToDash,
  sortByStringOrder,
  setLocalStorage,
  getLocalStorage,
} from "@/utils";
import type { TColumns } from "./types";
import type { TTableOptions } from "@/components/Table/types";

const props = defineProps<{
  tableOptions: TTableOptions;
  data?: Record<string, any>[];
}>();

interface IFilterCols {
  prop: string;
  label: string;
  isFixed: boolean;
  hide: boolean;
  isChecked: boolean;
}
const renderCols = ref<TColumns[]>([]);
const filterCols = ref<IFilterCols[]>([]);
const tableData = ref<Record<string, any>[]>([]);

// 切换隐藏
const changeHide = (item: IFilterCols) => {
  item.hide = !item.hide;
  item.isChecked = !item.isChecked;
};

// 排序
const dragSort = (data: Record<string, any>[], sort: string) => {
  console.log("排序了", data, sort);
};

// 结束拖拽
const draggerEnd = () => {
  const list = filterCols.value.map(({ prop }) => prop);
  renderCols.value = sortByStringOrder(renderCols.value, "prop", list);

  setLocalStorage("filterCols", {
    [`${location.host}`]: filterCols.value,
  });
};

// 固定列
const fixedColItem = (currFixColumn: IFilterCols) => {
  renderCols.value = renderCols.value.map((item) => {
    return item.prop === currFixColumn.prop
      ? Object.assign(item, { fixed: !currFixColumn.isFixed })
      : item;
  });

  const fixColumns = renderCols.value.filter((item) => item.fixed);
  const sortColumns = renderCols.value.filter((item) => !item.fixed);

  const sortColumnsList = props.tableOptions.cols
    .filter((item) =>
      sortColumns.map((item) => item.prop as string).includes(item?.prop || ""),
    )
    .map((item) => item.prop as string);
  const scrollColumns = sortByStringOrder(sortColumns, "prop", sortColumnsList);

  renderCols.value = [...fixColumns, ...scrollColumns];

  const sortList = renderCols.value.map((item) => item.prop as string);
  filterCols.value = sortByStringOrder(filterCols.value, "prop", sortList).map(
    (item) =>
      item.prop === currFixColumn.prop
        ? Object.assign(item, { isFixed: !currFixColumn.isFixed })
        : item,
  );

  setLocalStorage("filterCols", {
    [`${location.host}`]: filterCols.value,
  });
};

// 获取列表数据
const getTableData = () => {
  fetch("/api/list")
    .then((res) => res.json())
    .then(({ code, data }) => {
      if (code === 200) {
        tableData.value = data.list;
      }
    });
};

const isShowColsBtn = (row: any, key?: string) => {
  const data = row?.[`${CAN}${key}`];
  return isNumber(data) && data !== 0;
};

watch(
  [() => props.tableOptions, () => props.data],
  ([tableOptionsVal, dataVal]) => {
    const { cols, tableUrl } = tableOptionsVal;
    const cacheFilterCols =
      JSON.parse(getLocalStorage("filterCols") || "{}")?.[`${location.host}`] ||
      [];

    if (dataVal?.length && !tableUrl) {
      tableData.value = dataVal;
    }

    if (!dataVal?.length && tableUrl) {
      getTableData();
    }

    if (cacheFilterCols.length) {
      filterCols.value = cacheFilterCols;

      const firstCol = cols.find((item) => !item.prop);
      const lastCol = cols.find((item) => item.prop === OPERATE_FIELD);

      const mainCols = sortByStringOrder(
        cols.filter((item) => item.prop !== OPERATE_FIELD && item.prop),
        "prop",
        filterCols.value.map((item) => item.prop),
      );

      if (firstCol) {
        mainCols.unshift(firstCol);
      }
      if (lastCol) {
        mainCols.push(lastCol);
      }

      renderCols.value = mainCols.map((item) => {
        const filterItem = filterCols.value.find(
          (filterItem) => filterItem.prop === item.prop,
        );

        if (filterItem) {
          return Object.assign(item, { fixed: filterItem.isFixed });
        }

        return item;
      });

      return;
    }

    renderCols.value = cols;
    filterCols.value = cols
      .filter(({ prop }) => prop && prop !== OPERATE_FIELD)
      .map(({ prop, label, hide }: TColumns) => {
        return {
          prop: prop || "",
          label: label || "",
          isFixed: false,
          hide: hide || false,
          isChecked: !hide || false,
        };
      });
  },
  {
    immediate: true,
  },
);
</script>

<style scoped lange="scss">
.isLink {
  color: #409eff;
  cursor: pointer;
}

.filterBtn {
  font-size: 20px;
  outline-color: transparent;
}

:deep(.el-dropdown-menu__item) {
  cursor: auto;
}

.dropdownItem {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: auto;

  .iconWrap {
    margin-left: 35px;
    display: flex;
    align-items: center;

    .icon {
      cursor: pointer;

      &:last-child {
        margin-left: 10px;
      }
    }
  }
}

.el-table--border:after,
.el-table--border:before,
:deep(.el-table__inner-wrapper:before),
:deep(.el-table__inner-wrapper:after) {
  background-color: transparent !important;
}

:deep(.el-table__border-left-patch) {
  width: 0px !important;
}

:deep(.el-table__header .el-table__cell:last-child) {
  border-right-width: 0;
}

:deep(.el-table__body .el-table__cell) {
  border-right-width: 0;
}
</style>
