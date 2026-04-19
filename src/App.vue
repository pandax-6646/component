<template>
  <div class="app">
    <Form :config="formConfig" :data="formData" ref="formRef" />

    <div>
      <el-button @click="handleGetParams">获取参数</el-button>
      <el-button @click="handleResetForm">重置表单</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import Form from "./components/Form/index.vue";
import { getFormType } from "./components/Form/utils";
import { widthAsyncError } from "./hooks"; 

const formRef = ref<{
  getFormData: (isCheck?: boolean) => any;
  resetForm: () => void;
}>();
const formConfig = reactive([
  {
    label: "文本框",
    type: getFormType("INPUT"),
    modelKey: "name",
    rules: [
      { required: true, message: "请输入文本", trigger: "blur" },
      { min: 3, max: 5, message: "长度必须在 3 - 5", trigger: "blur" },
      { pattern: /^[a-zA-Z]+$/, message: "只能输入字母", trigger: "blur" },
      {
        validator: (_: any, value: any) => {
          if (value === "admin") {
            return Promise.reject(new Error("用户名不能为 admin"));
          }
          return Promise.resolve();
        },
        trigger: "blur",
      },
    ],
  },
  // {
  //   label: "Activity zone",
  //   type: getFormType("SELECT"),
  //   modelKey: "region",
  //   options: [
  //     { label: "Zone one", value: "shanghai" },
  //     { label: "Zone two", value: "beijing" },
  //   ],
  //   rules: [{ required: true, message: "请选择活动区域", trigger: "change" }],
  // },
]);
const formData = reactive({});

const handleGetParams = async () => {
  const [params, error] = await widthAsyncError(
    formRef.value?.getFormData(true),
  );

  console.log("测试数据", params, error);
};

const handleResetForm = () => {
  formRef.value?.resetForm();
};
</script>

<style scoped>
.app {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}
</style>
