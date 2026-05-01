<template>
  <el-input-number
    v-model="innerValue"
    :placeholder="placeholder"
    :disabled="disabled"
    :clearable="config?.clearable"
    :min="config?.min"
    :max="config?.max"
    :step="config?.step"
    :precision="config?.precision"
    :controls="config?.controls"
    :controls-position="config?.controlsPosition"
  />
</template>

<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{
  modelValue: number | null;
  placeholder?: string;
  disabled?: boolean;

  config?: any;
}>();

const emit = defineEmits<{
  (event: "update:modelValue", value: number | null): void;
}>();

const innerValue = computed({
  get: () => props.modelValue,
  set: (value: number | null) => emit("update:modelValue", value),
});
</script>
