<template>
  <div class="page-home">
    <Table :tableOptions="tableOptions" />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import Table from "@/components/Table/index.vue";
import { OPERATE_FIELD } from "@/utils/constants";
import type { TTableOptions } from "@/components/Table/types";

const tableOptions = ref<TTableOptions>({
  tableUrl: "/api/list",
  tableSearchKey: "/table",
  cols: [
    { type: "selection", fixed: "left", align: "center", width: 80 },
    { prop: "date", label: "时间", align: "center" },
    { prop: "name", label: "名称", align: "center" },
    { prop: "state", label: "州", align: "center" },
    {
      prop: "city",
      label: "市",
      align: "center",
      width: 150,
      render: (row: any) => `- ${row.city} -`,
    },
    {
      prop: "address",
      label: "地址",
      width: 300,
      sort: true,
      align: "center",
      hide: true,
      onlyScreen: true,
      onClick: (row: any) => {
        console.log("地址被点击了", row);
      },
    },
    { prop: "zip", label: "压缩", align: "center" },
    {
      prop: OPERATE_FIELD,
      width: 160,
      align: "center",
      buttonRender: [
        {
          label: "查看",
          key: "view",
          onClick: (row: any) => {
            console.log("查看", row);
          },
        },
        {
          label: "编辑",
          key: "edit",
          onClick: (row: any) => {
            console.log("编辑", row);
          },
        },
      ],
    },
  ],
  tabColKey: "status",
  tabCols: [
    {
      id: "all",
      name: "全部",
      isShow: true,
    },
    {
      id: "reject",
      name: "驳回",
      isShow: true,
    },
    {
      id: "timeout",
      name: "超时",
      isShow: true,
    },
  ],
});
</script>

<style scoped>
.page-home {
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 40px;
  width: 1000px;
}
</style>
