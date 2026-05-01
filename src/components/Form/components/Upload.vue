<template>
  <el-upload
    v-model:file-list="innerFileList"
    :action="action"
    :headers="headers"
    :data="data"
    :name="name"
    :with-credentials="config?.withCredentials"
    :show-upload-list="config?.showUploadList"
    :drag="config?.drag"
    :accept="accept"
    :multiple="config?.multiple"
    :limit="config?.limit"
    :auto-upload="config?.autoUpload"
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
    <template #tip v-if="config?.tip">
      <div class="el-upload__tip">{{ config?.tip }}</div>
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
  accept?: string;
  disabled?: boolean;
  placeholder?: string;
  config?: any;
}>();

const emit = defineEmits<{
  (event: "update:modelValue", value: UploadUserFile[]): void;
}>();

const action = computed(() => props.action || props.config?.action || "");
const headers = computed(() => props.headers || props.config?.headers);
const data = computed(() => props.data || props.config?.data);
const name = computed(() => props.name || props.config?.name || "file");
const accept = computed(() => props.accept || props.config?.accept || "");

const innerFileList = computed({
  get: () => props.modelValue || [],
  set: (value: UploadUserFile[]) => emit("update:modelValue", value),
});

const handleChange: UploadProps["onChange"] = (uploadFile, uploadFiles) => {
  props.config?.onChange?.(uploadFile, uploadFiles);
};

const handlePreview: UploadProps["onPreview"] = (uploadFile) => {
  props.config?.onPreview?.(uploadFile);
};

const handleRemove: UploadProps["onRemove"] = (uploadFile, uploadFiles) => {
  props.config?.onRemove?.(uploadFile, uploadFiles);
};

const handleSuccess: UploadProps["onSuccess"] = (
  response,
  uploadFile,
  uploadFiles,
) => {
  props.config?.onSuccess?.(response, uploadFile, uploadFiles);
};

const handleError: UploadProps["onError"] = (
  error,
  uploadFile,
  uploadFiles,
) => {
  props.config?.onError?.(error, uploadFile, uploadFiles);
};

const handleProgress: UploadProps["onProgress"] = (
  event,
  uploadFile,
  uploadFiles,
) => {
  props.config?.onProgress?.(event, uploadFile, uploadFiles);
};

const handleExceed: UploadProps["onExceed"] = (files, uploadFiles) => {
  props.config?.onExceed?.(files, uploadFiles);
};
</script>
