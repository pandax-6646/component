<template>
  <el-radio-group v-model="innerValue" :disabled="disabled">
    <el-radio
      v-for="option in options"
      :key="option.value"
      :value="option.value"
      :disabled="option.disabled"
    >
      {{ option.label }}
    </el-radio>
  </el-radio-group>
</template>

<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{
  modelValue: string;
  options: Array<{ label: string; value: string; disabled?: boolean }>;
  disabled?: boolean;
}>();

const emit = defineEmits<{
  (event: "update:modelValue", value: string): void;
}>();

const innerValue = computed({
  get: () => props.modelValue,
  set: (value: string) => emit("update:modelValue", value),
});
</script>

<style lang="scss" scoped></style>
