<template>
  <el-select
    v-model="innerValue"
    :placeholder="placeholder"
    :disabled="disabled"
    :style="config?.style"
  >
    <el-option
      v-for="{ label, value, disabled } in options"
      :label="label"
      :value="value"
      :key="value"
      :disabled="disabled"
    />
  </el-select>
</template>

<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{
  options: Array<{ label: string; value: any; disabled?: boolean }>;
  modelValue: any;
  placeholder?: string;
  disabled?: boolean;
  clearable?: boolean;
  config?: any;
}>();

const emit = defineEmits(["update:modelValue"]);

const options = computed(() => props.options || props.config?.options || []);

const innerValue = computed({
  get: () => props.modelValue,
  set: (val) => emit("update:modelValue", val),
});
</script>
<style scoped>
.el-select {
 min-width: 220px;
}
</style>
