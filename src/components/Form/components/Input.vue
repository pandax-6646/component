<template>
  <el-input
    v-model="innerValue"
    :placeholder="placeholder"
    :show-word-limit="config?.showWordLimit"
    :word-limit-position="config?.wordLimitPosition"
    :type="config?.inputType || 'text'"
    :show-password="config?.showPassword"
    :readonly="config?.readonly"
    :rows="config?.rows"
  />
</template>

<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{
  modelValue: string;
  placeholder?: string;
  disabled?: boolean;
  config?: any;
}>();

const emit = defineEmits<{
  (event: "update:modelValue", value: string): void;
}>();

const innerValue = computed({
  get: () => props.modelValue,
  set: (value: string) => emit("update:modelValue", value),
});
</script>
