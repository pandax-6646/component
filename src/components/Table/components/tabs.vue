<template>
  <div class="tableHeader">
    <el-tabs v-model="tabActiveRef" @tab-click="tabClick">
      <el-tab-pane
        v-for="item in tabCols"
        :label="item.name"
        :name="item.id"
        :key="item.id"
      />
      <el-tab-pane disabled>
        <template #label>
          <el-dropdown popper-class="moreFilterPopper" ref="dropdownRef" placement="bottom-start">
            <span class="moreFilter">
              更多筛选 <i class="el-icon-arrow-down el-icon--right"></i>
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

    <div class="searchWrap">
      <el-input v-model="searchValueRef" placeholder="请输入搜索关键字">
        <template #append>
          <el-icon @click="advancedQuery"><Search /></el-icon>
        </template>
      </el-input>

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
import type {
  TTabCols,
  TSearchButtonCols,
  TTabMoreFilter,
} from "@/components/Table/types";

const props = defineProps<{
  tabCols: TTabCols[];
  searchButtonCols: TSearchButtonCols[];
  tabMoreFilter: TTabMoreFilter[];
}>();

const tabActiveRef = ref("");
const searchValueRef = ref("");
const searchBtnRef = ref<TSearchButtonCols[]>([]);
const dropdownRef = ref();

// 切换表头的tabs
const tabClick = (tab: any) => {
  console.log("测试数据", tab);
};

// 开启高级查询弹窗
const advancedQuery = () => {
  console.log("测试数据");
};

// 点击更多筛选选项
const handleRadio = (key: string, value: string | number) => {
  console.log("测试数据", key, value);
  dropdownRef.value?.handleClose();
};

watch(
  [() => props.tabCols, () => props.searchButtonCols],
  ([tabColsVal, searchButtonColsVal]) => {
    if (tabColsVal?.length) {
      const initRow = tabColsVal.find((item) => item.initActive);
      tabActiveRef.value = initRow?.id || tabColsVal[0].id;
    }

    if (searchButtonColsVal?.length) {
      searchBtnRef.value = searchButtonColsVal.filter((item) => item.isShow);
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

  .moreFilter:focus-visible {
    outline: none;
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
</style>
