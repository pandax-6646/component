<template>
  <el-switch
    v-model="innerValue"
    :disabled="disabled"
    :active-text="activeText"
    :inactive-text="inactiveText"
    :active-value="activeValue"
    :inactive-value="inactiveValue"
    :active-color="activeColor"
    :inactive-color="inactiveColor"
  />
</template>

<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{
  modelValue: boolean;
  disabled?: boolean;
  activeText?: string;
  inactiveText?: string;
  activeValue?: boolean | number | string;
  inactiveValue?: boolean | number | string;
  activeColor?: string;
  inactiveColor?: string;
}>();

const emit = defineEmits<{
  (event: "update:modelValue", value: boolean): void;
}>();

const innerValue = computed({
  get: () => props.modelValue,
  set: (value: boolean) => emit("update:modelValue", value),
});
</script>

<style lang="scss" scoped></style>
