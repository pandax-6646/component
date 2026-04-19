<template>
  <el-input v-model="innerValue" />
</template>

<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{
  modelValue: string;
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
