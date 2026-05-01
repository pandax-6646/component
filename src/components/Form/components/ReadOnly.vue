<template>
  <div class="readonly-text">{{ displayValue }}</div>
</template>

<script setup lang="ts">
const props = defineProps<{
  modelValue?: string;
  value?: string;
}>();

const displayValue = props.value || props.modelValue || "";
</script>

<style scoped>
.readonly-text {
  padding: 0 11px;
  color: var(--el-text-color-regular);
  line-height: 32px;
}
</style>
