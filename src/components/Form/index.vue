<template>
  <el-form
    ref="formRef"
    :model="data"
    label-width="auto"
    style="max-width: 600px"
  >
    <el-form-item
      v-for="(
        { label, modelKey, type, placeholder, disabled, rules, ...config },
        index
      ) in formConfigs"
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

import type { IFormConfigs } from "./types";
import type { FormInstance, FormValidateCallback } from "element-plus";

interface IValidateFields {
  prop: string;
  callback: FormValidateCallback;
}

const props = defineProps<{
  configs: IFormConfigs[];
  data: Record<string, any>;
}>();

const formConfigs = ref<IFormConfigs[]>();
const data = ref<Record<string, any>>(props.data);
const formRef = ref<FormInstance>();

const getFormData = async (
  isCheck?: boolean,
): Promise<Record<string, any> | boolean> => {
  if (!formRef.value) return false;
  try {
    if (isCheck) {
      await formRef.value?.validate();
    }

    return data.value;
  } catch (error: any) {
    const errorFields = Object.keys(error);
    formRef.value?.scrollToField(errorFields[0]);

    return Promise.reject(false);
  }
};

const validateFields = (fields: IValidateFields[]) => {
  fields.forEach(({ prop, callback }) => {
    formRef.value?.validateField(prop, callback);
  });
};

const setFormData = (formData: Record<string, any>) => {
  Object.assign(data.value, formData);
};

const resetForm = () => {
  formRef.value?.resetFields();
};

const updateConfigs = (configs: IFormConfigs[], data: Record<string, any>) => {
  formConfigs.value = configs.filter(({ isShow = true }) =>
    typeof isShow === "function" ? isShow(data) : isShow,
  );
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

watch(
  props.configs,
  (newVal) => {
    updateConfigs(newVal, data.value);
  },
  { deep: true, immediate: true },
);

defineExpose({
  getFormData,
  resetForm,
  setFormData,
  updateConfigs,
  validateFields,
});
</script>
