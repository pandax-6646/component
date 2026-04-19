<template>
  <el-input
    v-model="innerValue"
    :placeholder="placeholder"
    :show-word-limit="showWordLimit"
    :word-limit-position="wordLimitPosition"
    :type="type || 'text'"
    :show-password="showPassword"
    :readonly="readonly"
    :rows="rows"
    @change="changeValue"
  />
</template>

<script setup lang="ts">
import { computed } from "vue";
import type { TText } from "../types";

const props = defineProps<{
  modelValue: string;
  placeholder?: string;
  showWordLimit?: boolean;
  wordLimitPosition?: TText["wordLimitPosition"];
  type: TText["inputType"];
  showPassword?: boolean;
  readonly?: boolean;
  rows?: number;
  change?: (value: string) => void;
  }>();

const emit = defineEmits<{
  (event: "update:modelValue", value: string): void;
}>();

const innerValue = computed({
  get: () => props.modelValue,
  set: (value: string) => emit("update:modelValue", value),
});

const changeValue = (value: string) => {
  props.change?.(value);
};
</script>

<style lang="scss" scoped></style>
