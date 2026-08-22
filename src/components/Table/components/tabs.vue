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
          <el-dropdown>
            <span class="moreFilter">
              更多筛选 <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <template #dropdown>
              <div class="moreFilterWrap">weqrwrqwer</div>
            </template>
          </el-dropdown>
        </template>
      </el-tab-pane>
    </el-tabs>

    <div class="searchWrap">
      <el-input v-model="searchValueRef" placeholder="请输入搜索关键字">
        <template #append>
          <el-icon @click="advancedQuery"><Search /></el-icon> </template
      ></el-input>

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
import type { TTabCols, TSearchButtonCols } from "@/components/Table/types";

const props = defineProps<{
  tabCols: TTabCols[];
  searchButtonCols: TSearchButtonCols[];
}>();

const tabActiveRef = ref("");
const searchValueRef = ref("");
const searchBtnRef = ref<TSearchButtonCols[]>([]);

// 切换表头的tabs
const tabClick = (tab: any) => {
  console.log("测试数据", tab);
};

const advancedQuery = () => {
  console.log("测试数据");
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
</style>
