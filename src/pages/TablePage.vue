<template>
  <div class="page-home">
    <Table :tableOptions="tableOptions" />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import Table from "@/components/Table/index.vue";
import { OPERATE_FIELD } from "@/utils/constants";
import { SCREEN_TYPE } from "@/components/Form/constants";
import { QUERY_METHOD } from "@/components/Table/constants";
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
      screenInfo: {
        type: SCREEN_TYPE.INPUT,
        searchType: QUERY_METHOD.LIKE,
        name: "city",
        placeholder: "请输入仪器名称",
      },
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
      screenInfo: {
        type: SCREEN_TYPE.INPUT,
        searchType: QUERY_METHOD.LIKE,
        name: "address",
        placeholder: "请输入仪器名称",
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
  searchButtonCols: [
    {
      name: "发起审批",
      key: "aaa",
      isShow: true,
      onClick: function () {
        console.log("发起审批");
      },
    },
    {
      name: "审批",
      key: "bbb",
      type: "primary",
      isShow: true,
      onClick: function () {
        console.log("审批");
      },
    },
  ],
  tabMoreFilter: [
    {
      name: "设备状态",
      key: "yqm.device_status",
      radioGroup: [
        { label: "已绑定", value: "10" },
        { label: "未绑定", value: "40" },
      ],
    },
    {
      name: "状态",
      key: "yqm",
      radioGroup: [
        { label: "私有", value: "20" },
        { label: "公共", value: "41" },
      ],
    },
    {
      name: "设备选项",
      key: "device_status",
      radioGroup: [
        { value: 41, label: "锁定" },
        { value: 2, label: "解锁" },
      ],
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
