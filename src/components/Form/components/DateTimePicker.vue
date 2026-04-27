<template>
  <el-date-picker
    v-model="innerValue"
    :type="pickerType"
    :placeholder="placeholder"
    :disabled="disabled"
    :clearable="clearable"
    :format="format"
    :value-format="valueFormat"
    :disabled-date="disabledDate"
    :shortcuts="shortcuts"
  />
</template>

<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{
  modelValue: Date | string | null;
  type?: "date" | "datetime" | "week" | "month" | "year";
  placeholder?: string;
  disabled?: boolean;
  clearable?: boolean;
  format?: string;
  valueFormat?: string;
  disabledDate?: (date: Date) => boolean;
  shortcuts?: Array<{ text: string; value: Date | (() => Date) }>;
}>();

const emit = defineEmits<{
  (event: "update:modelValue", value: Date | string | null): void;
}>();

const pickerType = computed(() => props.type || "date");

const innerValue = computed({
  get: () => props.modelValue,
  set: (value) => emit("update:modelValue", value),
});
</script>

<style lang="scss" scoped></style>
