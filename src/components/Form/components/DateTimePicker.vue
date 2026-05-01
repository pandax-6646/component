<template>
  <el-date-picker
    v-model="innerValue"
    :type="pickerType"
    :placeholder="placeholder"
    :disabled="disabled"
    :clearable="config?.clearable"
    :format="config?.format"
    :value-format="config?.valueFormat"
    :disabled-date="config?.disabledDate"
    :shortcuts="config?.shortcuts"
  />
</template>

<script setup lang="ts">
import { computed } from "vue";
import type { TDateType } from "../types";

const props = defineProps<{
  modelValue: Date | string | null;
  placeholder?: string;
  disabled?: boolean;
  pickerType: TDateType;
  config?: any;
}>();

const emit = defineEmits<{
  (event: "update:modelValue", value: Date | string | null): void;
}>();

const innerValue = computed({
  get: () => props.modelValue,
  set: (value) => emit("update:modelValue", value),
});
</script>
