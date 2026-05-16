<template>
  <el-table
    :data="data"
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
      } in columns"
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
        :sortable="sort ? 'scustom' : false"
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
          <el-icon size="20">
            <Operation />
          </el-icon>
        </template>

        <template #default="{ row }">
          <el-button
            v-for="({ label, onClick }, index) in buttonRender"
            :key="index"
            @click="() => onClick(row)"
            type="primary"
            size="small"
          >
            {{ label }}
          </el-button>
        </template>
      </el-table-column>
    </template>
  </el-table>
</template>

<script setup lang="ts">
import { OPERATE_FIELD } from "@/utils/constants";
import { emptyToDash } from "@/utils";
import type { TColumns } from "./types";

defineProps<{
  columns: TColumns[];
  data: Record<string, any>[];
}>();

// 拖拽排序
const dragSort = (data: Record<string, any>[], sort: string) => {
  console.log("排序了", data, sort);
};
</script>

<style scoped>
.isLink {
  color: #409eff;
  cursor: pointer;
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
