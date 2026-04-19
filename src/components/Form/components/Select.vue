<template>
  <el-select v-model="modelValue" :placeholder="placeholder">
    <el-option
      :label="option.label"
      :value="option.value"
      v-for="option in options"
      :key="option.value"
    />
  </el-select>
</template>

<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{
  options: { label: string; value: any }[];
  modelValue: any;
  placeholder?: string;
}>();

const emit = defineEmits(["update:modelValue"]);

const modelValue = computed({
  get: () => {
    return props.modelValue;
  },
  set: (val) => {
    emit("update:modelValue", val);
  },
});
</script>

<style lang="scss" scoped></style>
