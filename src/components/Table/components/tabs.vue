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
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import type { TTabCols } from "@/components/Table/types";

const props = defineProps<{
  tabCols: TTabCols[];
}>();

const tabActiveRef = ref("");

// 切换表头的tabs
const tabClick = (tab: any) => {
  console.log("测试数据", tab);
};

watch(
  () => props.tabCols,
  (val) => {
    if (val?.length) {
      const initRow = val.find((item) => item.initActive);
      tabActiveRef.value = initRow?.id || val[0].id;
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
  }
}
</style>
