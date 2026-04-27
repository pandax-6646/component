<template>
  <el-upload
    v-model:file-list="innerFileList"
    :action="action"
    :headers="headers"
    :data="data"
    :name="name"
    :with-credentials="withCredentials"
    :show-upload-list="showUploadList"
    :drag="drag"
    :accept="accept"
    :multiple="multiple"
    :limit="limit"
    :auto-upload="autoUpload"
    :disabled="disabled"
    :on-change="handleChange"
    :on-preview="handlePreview"
    :on-remove="handleRemove"
    :on-success="handleSuccess"
    :on-error="handleError"
    :on-progress="handleProgress"
    :on-exceed="handleExceed"
  >
    <slot>
      <el-button type="primary" :disabled="disabled">
        {{ placeholder || "点击上传" }}
      </el-button>
    </slot>
    <template #tip v-if="tip">
      <div class="el-upload__tip">{{ tip }}</div>
    </template>
  </el-upload>
</template>

<script setup lang="ts">
import { computed } from "vue";
import type { UploadProps, UploadUserFile } from "element-plus";

const props = defineProps<{
  modelValue?: UploadUserFile[];
  action?: string;
  headers?: Record<string, string>;
  data?: Record<string, any>;
  name?: string;
  withCredentials?: boolean;
  showUploadList?: boolean;
  drag?: boolean;
  accept?: string;
  multiple?: boolean;
  limit?: number;
  autoUpload?: boolean;
  disabled?: boolean;
  placeholder?: string;
  tip?: string;
  onChange?: UploadProps["onChange"];
  onPreview?: UploadProps["onPreview"];
  onRemove?: UploadProps["onRemove"];
  onSuccess?: UploadProps["onSuccess"];
  onError?: UploadProps["onError"];
  onProgress?: UploadProps["onProgress"];
  onExceed?: UploadProps["onExceed"];
}>();

const emit = defineEmits<{
  (event: "update:modelValue", value: UploadUserFile[]): void;
}>();

const innerFileList = computed({
  get: () => props.modelValue || [],
  set: (value: UploadUserFile[]) => emit("update:modelValue", value),
});

const handleChange: UploadProps["onChange"] = (uploadFile, uploadFiles) => {
  props.onChange?.(uploadFile, uploadFiles);
};

const handlePreview: UploadProps["onPreview"] = (uploadFile) => {
  props.onPreview?.(uploadFile);
};

const handleRemove: UploadProps["onRemove"] = (uploadFile, uploadFiles) => {
  props.onRemove?.(uploadFile, uploadFiles);
};

const handleSuccess: UploadProps["onSuccess"] = (
  response,
  uploadFile,
  uploadFiles,
) => {
  props.onSuccess?.(response, uploadFile, uploadFiles);
};

const handleError: UploadProps["onError"] = (
  error,
  uploadFile,
  uploadFiles,
) => {
  props.onError?.(error, uploadFile, uploadFiles);
};

const handleProgress: UploadProps["onProgress"] = (
  event,
  uploadFile,
  uploadFiles,
) => {
  props.onProgress?.(event, uploadFile, uploadFiles);
};

const handleExceed: UploadProps["onExceed"] = (files, uploadFiles) => {
  props.onExceed?.(files, uploadFiles);
};
</script>

<style lang="scss" scoped></style>
