<template>
  <div class="page-home">
    <Table :columns="columns" :data="tableData" />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import Table from "@/components/Table/index.vue";
import { OPERATE_FIELD } from "@/utils/constants";
import type { TColumns } from "@/components/Table/types";

const columns = ref<TColumns[]>([
  { type: "selection", fixed: "left", align: "center" },
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
        onClick: (row: any) => {
          console.log("查看", row);
        },
      },
      {
        label: "编辑",
        onClick: (row: any) => {
          console.log("编辑", row);
        },
      },
    ],
  },
]);

const tableData = ref<Record<string, any>[]>([
  {
    id: 1,
    date: "2016-05-01",
    name: "",
    state: "California",
    city: "Los Angeles",
    address: "No. 189, Grove St, Los Angeles",
    zip: "CA 90036",
  },
  {
    id: 2,
    date: "2016-05-02",
    name: "Tom",
    state: "",
    city: "Los Angeles",
    address: "No. 189, Grove St, Los Angeles",
    zip: "CA 90036",
  },
  {
    id: 3,
    date: "2016-05-03",
    name: "Tom",
    state: "California",
    city: "Los Angeles",
    address: "No. 189, Grove St, Los Angeles",
    zip: "CA 90036",
  },
]);
</script>

<style scoped>
.page-home {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  padding: 40px;
}
</style>
