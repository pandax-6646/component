<template>
  <el-input-number
    v-model="innerValue"
    :placeholder="placeholder"
    :disabled="disabled"
    :clearable="clearable"
    :min="min"
    :max="max"
    :step="step"
    :precision="precision"
    :controls="controls"
    :controls-position="controlsPosition"
  />
</template>

<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{
  modelValue: number | null;
  placeholder?: string;
  disabled?: boolean;
  clearable?: boolean;
  min?: number;
  max?: number;
  step?: number;
  precision?: number;
  controls?: boolean;
  controlsPosition?: "right" | "default";
}>();

const emit = defineEmits<{
  (event: "update:modelValue", value: number | null): void;
}>();

const innerValue = computed({
  get: () => props.modelValue,
  set: (value: number | null) => emit("update:modelValue", value),
});
</script>

<style lang="scss" scoped></style>
