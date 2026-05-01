<template>
  <el-form
    ref="ruleFormRef"
    :model="data"
    label-width="auto"
    style="max-width: 600px"
  >
    <el-form-item
      v-for="(
        { label, modelKey, type, placeholder, disabled, rules, ...config },
        index
      ) in configs"
      :label="label"
      :key="index"
      :prop="modelKey"
      :rules="rules"
    >
      <Input
        v-if="type === 'INPUT'"
        v-model="data[modelKey]"
        :placeholder="placeholder"
        :disabled="disabled"
        :config="config"
      />
      <Select
        v-else-if="type === 'SELECT'"
        v-model="data[modelKey]"
        :options="config?.options || []"
        :placeholder="placeholder"
        :disabled="disabled"
        :config="config"
      />
      <NumberInput
        v-else-if="type === 'NUMBER'"
        v-model="data[modelKey]"
        :placeholder="placeholder"
        :disabled="disabled"
        :config="config"
      />
      <DateTimePicker
        v-else-if="type === 'DATE'"
        :pickerType="config?.dateType || 'date'"
        v-model="data[modelKey]"
        :placeholder="placeholder"
        :disabled="disabled"
        :config="config"
      />
      <Radio
        v-else-if="type === 'RADIO'"
        v-model="data[modelKey]"
        :options="config?.options ?? []"
        :disabled="disabled"
        :config="config"
      />
      <Checkbox
        v-else-if="type === 'CHECKBOX'"
        v-model="data[modelKey]"
        :options="config?.options ?? []"
        :disabled="disabled"
        :config="config"
      />
      <Switch
        v-else-if="type === 'SWITCH'"
        v-model="data[modelKey]"
        :disabled="disabled"
        :config="config"
      />
      <Upload
        v-else-if="type === 'UPLOAD'"
        v-model="data[modelKey]"
        :disabled="disabled"
        :placeholder="placeholder"
        :config="config"
      />
      <ReadOnly v-else-if="type === 'READONLY'" :modelValue="data[modelKey]" />
    </el-form-item>
  </el-form>
</template>

<script lang="ts" setup>
import { ref, watch } from "vue";
import Input from "./components/Input.vue";
import Select from "./components/Select.vue";
import NumberInput from "./components/NumberInput.vue";
import DateTimePicker from "./components/DateTimePicker.vue";
import Radio from "./components/Radio.vue";
import Checkbox from "./components/Checkbox.vue";
import Switch from "./components/Switch.vue";
import Upload from "./components/Upload.vue";
import ReadOnly from "./components/ReadOnly.vue";

import { widthAsyncError } from "../../hooks";

import type { IFormConfigs } from "./types";
import type { FormInstance } from "element-plus";

const props = defineProps<{
  configs: IFormConfigs[];
  data: Record<string, any>;
}>();

const data = ref(props.data);
const ruleFormRef = ref<FormInstance>();

const getFormData = async (
  isCheck?: boolean,
): Promise<Record<string, any> | boolean> => {
  if (!ruleFormRef.value) return false;

  if (isCheck) {
    const [isValid] = await widthAsyncError(
      ruleFormRef.value?.validate() ?? Promise.resolve(false),
    );

    if (!isValid) return false;
  }

  return data.value;
};

const setFormData = (formData: Record<string, any>) => {
  data.value = formData;
};

const resetForm = () => {
  if (!ruleFormRef.value) return;
  ruleFormRef.value.resetFields();
};

const emit = defineEmits<{
  (event: "update:data", value: Record<string, any>): void;
}>();

watch(
  data,
  (newVal) => {
    emit("update:data", newVal);
  },
  { deep: true },
);

defineExpose({
  getFormData,
  resetForm,
  setFormData,
});
</script>
