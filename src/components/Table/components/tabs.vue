<template>
  <div class="tableHeader">
    <el-tabs v-model="tabActiveRef" @tab-click="tabClick">
      <el-tab-pane
        v-for="item in tabCols"
        :label="item.name"
        :name="item.id"
        :key="item.id"
      />

      <!-- 更多筛选 -->
      <el-tab-pane disabled>
        <template #label>
          <el-dropdown
            popper-class="moreFilterPopper"
            ref="moreFilterDropdownRef"
            placement="bottom-start"
          >
            <span class="moreFilter">
              更多筛选
              <el-icon class="icon"><ArrowDown /></el-icon>
            </span>
            <template #dropdown>
              <div class="moreFilterWrap">
                <div
                  v-for="item in tabMoreFilter"
                  :key="item.key"
                  class="radioGroup"
                >
                  <div class="label">{{ item.name }}：</div>
                  <div
                    class="radio"
                    v-for="radio in item.radioGroup"
                    :key="radio.value"
                    @click="handleRadio(item.key, radio.value)"
                  >
                    {{ radio.label }}
                  </div>
                </div>
              </div>
            </template>
          </el-dropdown>
        </template>
      </el-tab-pane>
    </el-tabs>

    <!-- 快捷搜索框 + 高级搜索 -->
    <div class="searchWrap">
      <el-input v-model="searchValueRef" placeholder="请输入搜索关键字">
        <template #append>
          <el-dropdown
            popper-class="advancedSearchPopper"
            ref="advancedSearchDropdownRef"
            placement="bottom-end"
            trigger="click"
          >
            <el-icon>
              <Search />
            </el-icon>
            <template #dropdown>
              <div class="advancedSearchWrap">
                <Form
                  :configs="advancedSearchRef"
                  :data="formData"
                  ref="formRef"
                  :inline="true"
                />

                <!-- 高级搜索按钮 -->
                <div class="advancedSearchBtnWrap">
                  <el-button type="primary" @click="handleAdvancedSearch">
                    查询
                  </el-button>
                  <el-button @click="formRef?.resetForm()">
                    重置
                  </el-button>
                  <el-button @click="advancedSearchDropdownRef?.handleClose()">取消</el-button>
                </div>
              </div>
            </template>
          </el-dropdown>
        </template>
      </el-input>

      <!-- 操作按钮 -->
      <div class="searchBtnWrap">
        <template v-for="{ key, name, isShow, onClick } in searchBtnRef">
          <el-button :key="key" @click="onClick" type="primary" v-if="isShow">
            {{ name }}
          </el-button>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import Form from "@/components/Form/index.vue";


import type {
  TTabCols,
  TColumns,
  TSearchButtonCols,
  TTabMoreFilter,
} from "@/components/Table/types";

const props = defineProps<{
  tabCols: TTabCols[];
  searchButtonCols: TSearchButtonCols[];
  tabMoreFilter: TTabMoreFilter[];
  cols: TColumns[];
}>();

const tabActiveRef = ref("");
const searchValueRef = ref("");
const searchBtnRef = ref<TSearchButtonCols[]>([]);
const moreFilterDropdownRef = ref();

const advancedSearchDropdownRef = ref();
const advancedSearchRef = ref();
const formData = ref({});
const formRef = ref();


// 切换表头的tabs
const tabClick = (tab: any) => {
  console.log("测试数据", tab);
};

// 点击更多筛选选项
const handleRadio = (key: string, value: string | number) => {
  console.log("测试数据", key, value);
  moreFilterDropdownRef.value?.handleClose();
};

// 高级搜索
const handleAdvancedSearch = async () => {
  try {
    const result = await formRef.value?.getFormData()

    console.log("高级搜索", result);
  } catch (error) {
    console.log("高级搜索错误", error);
  }

};

watch(
  [() => props.tabCols, () => props.searchButtonCols, () => props.cols],
  ([tabColsVal, searchButtonColsVal, colsVal]) => {
    if (tabColsVal?.length) {
      const initRow = tabColsVal.find((item) => item.initActive);
      tabActiveRef.value = initRow?.id || tabColsVal[0].id;
    }

    if (searchButtonColsVal?.length) {
      searchBtnRef.value = searchButtonColsVal.filter((item) => item.isShow);
    }

    if (colsVal?.length) {
      advancedSearchRef.value = colsVal
        .filter((item) => item?.screenInfo)
        .map((item) => {
          return {
            label: item.label,
            ...item.screenInfo,
            modelKey: item?.screenInfo?.name || "",
          };
        });
    }
  },
  {
    immediate: true,
  },
);
</script>

<style lang="scss" scoped>
.tableHeader {
  text-align: left;
  position: relative;

  :deep(.el-tabs__item.is-disabled) {
    cursor: pointer;
  }

  .moreFilter {
    display: flex;
    align-items: center;

    .icon {
      margin-left: 5px;
    }
  }

  .searchWrap {
    position: absolute;
    right: 0;
    top: 0;

    display: flex;
    align-items: center;

    :deep(.el-input-group__append) {
      padding: 0;
      background: 0 0;

      .el-icon {
        height: 100%;
        padding: 0 8px;
        cursor: pointer;
      }
    }

    .searchBtnWrap {
      margin-left: 15px;
      display: flex;
    }
  }
}

.moreFilterPopper .moreFilterWrap {
  padding: 10px 20px;
  font-size: 14px;
  color: var(--el-text-color-primary);

  .radioGroup {
    display: flex;

    .label {
      font-weight: 700;
    }

    .radio:not(:last-child) {
      margin-right: 15px;
    }

    .radio:hover {
      cursor: pointer;
      color: var(--el-color-primary);
    }
  }

  .radioGroup:not(:last-child) {
    margin-bottom: 10px;
  }
}

.advancedSearchPopper .advancedSearchWrap {
  padding: 20px;
  font-size: 14px;
  color: var(--el-text-color-primary);

  .advancedSearchBtnWrap {
    display: flex;
    justify-content: flex-end;
    margin-top: 10px;
  }
}
</style>
