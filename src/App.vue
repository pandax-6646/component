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
import { widthAsyncError } from "./hooks";
import type { UploadUserFile } from "element-plus";

const formRef = ref<{
  getFormData: (isCheck?: boolean) => any;
  resetForm: () => void;
}>();

const formConfig = reactive([
  {
    label: "文本框",
    type: "INPUT" as const,
    modelKey: "name",
    placeholder: "请输入文本",
    inputType: "textarea" as const,
    showWordLimit: true,
    rows: 4,
    maxlength: 5,
    showPassword: true,
    wordLimitPosition: "inside" as const,
    clearable: true,
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
  {
    label: "选择框",
    type: "SELECT" as const,
    modelKey: "region",
    placeholder: "请选择活动区域",
    options: [
      { label: "选项一", value: "shanghai" },
      { label: "选项二", value: "beijing" },
    ],
    rules: [{ required: true, message: "请选择活动区域", trigger: "change" }],
  },
  {
    label: "数字输入框",
    type: "NUMBER" as const,
    modelKey: "quantity",
    placeholder: "请输入数量",
    min: 0,
    max: 100,
    step: 1,
    precision: 0,
    controls: true,
    rules: [
      { required: true, message: "请输入数量", trigger: "blur" },
    ],
  },
  {
    label: "日期选择",
    type: "DATE" as const,
    modelKey: "date",
    placeholder: "请选择日期",
    valueFormat: "YYYY-MM-DD",
    rules: [{ required: true, message: "请选择日期", trigger: "change" }],
  },
  {
    label: "日期时间选择",
    type: "DATETIME" as const,
    modelKey: "datetime",
    placeholder: "请选择日期时间",
    valueFormat: "YYYY-MM-DD HH:mm:ss",
    rules: [{ required: true, message: "请选择日期时间", trigger: "change" }],
  },
  {
    label: "单选框",
    type: "RADIO" as const,
    modelKey: "gender",
    options: [
      { label: "男", value: "male" },
      { label: "女", value: "female" },
    ],
    rules: [{ required: true, message: "请选择性别", trigger: "change" }],
  },
  {
    label: "多选框",
    type: "CHECKBOX" as const,
    modelKey: "hobbies",
    options: [
      { label: "足球", value: "football" },
      { label: "篮球", value: "basketball" },
      { label: "游泳", value: "swimming" },
    ],
    rules: [{ required: true, message: "请选择爱好", trigger: "change" }],
  },
  {
    label: "开关",
    type: "SWITCH" as const,
    modelKey: "enabled",
    activeText: "开启",
    inactiveText: "关闭",
    activeValue: true,
    inactiveValue: false,
  },
  {
    label: "文件上传",
    type: "UPLOAD" as const,
    modelKey: "files",
    action: "/api/upload",
    multiple: true,
    limit: 3,
    accept: ".jpg,.png,.pdf",
    tip: "支持 jpg、png、pdf 格式，最多上传3个文件",
  },
]);

const formData = reactive({
  name: "",
  region: "",
  quantity: null as number | null,
  date: null as Date | string | null,
  datetime: null as Date | string | null,
  gender: "",
  hobbies: [] as string[],
  enabled: false,
  files: [] as UploadUserFile[],
});

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
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  gap: 20px;
}
</style>
