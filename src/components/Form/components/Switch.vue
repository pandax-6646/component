<template>
  <el-switch
    v-model="innerValue"
    :disabled="disabled"
    :active-text="config?.activeText"
    :inactive-text="config?.inactiveText"
    :active-value="config?.activeValue"
    :inactive-value="config?.inactiveValue"
    :active-color="config?.activeColor"
    :inactive-color="config?.inactiveColor"
  />
</template>

<script setup lang="ts">
import { computed } from "vue";

const props = defineProps<{
  modelValue: boolean;
  disabled?: boolean;
  config?: any;
}>();

const emit = defineEmits<{
  (event: "update:modelValue", value: boolean): void;
}>();

const innerValue = computed({
  get: () => props.modelValue,
  set: (value: boolean) => emit("update:modelValue", value),
});
</script>
