<template>
  <div>
    <el-tabs v-model="tabActiveRef" @tab-click="tabClick" class="tabsWrap">
      <el-tab-pane
        v-for="item in tabCols"
        :label="item.name"
        :name="item.id"
        :key="item.id"
      />
      <el-tab-pane>
        <template #label>
          <el-dropdown tabindex="9999999999">
            <span class="el-dropdown-link">
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
.tabsWrap {
  text-align: left;
}
</style>
