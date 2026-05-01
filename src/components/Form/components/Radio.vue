<template>
  <el-radio-group v-model="innerValue" :disabled="disabled">
    <el-radio
      v-for="{ label, value, disabled } in options"
      :key="value"
      :value="value"
      :disabled="disabled"
    >
      {{ label }}
    </el-radio>
  </el-radio-group>
</template>

<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{
  modelValue: string;
  options: Array<{ label: string; value: string; disabled?: boolean }>;
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
