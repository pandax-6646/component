<template>
  <el-form
    ref="ruleFormRef"
    :model="data"
    label-width="auto"
    style="max-width: 600px"
  >
    <el-form-item
      v-for="(item, index) in config"
      :label="item.label"
      :key="index"
      :prop="item.modelKey"
      :rules="item.rules"
    >
      <Input
        v-if="item.type === 'INPUT'"
        v-model="data[item.modelKey]"
        :placeholder="item.placeholder"
        :disabled="item.disabled"
        :clearable="item.clearable"
        :maxlength="item.maxlength"
        :showWordLimit="item.showWordLimit"
        :wordLimitPosition="item.wordLimitPosition"
        :type="item.inputType"
        :showPassword="item.showPassword"
        :readonly="item.readonly"
        :rows="item.rows"
        :change="item.change"
      />
      <Select
        v-else-if="item.type === 'SELECT'"
        v-model="data[item.modelKey]"
        :options="item.options ?? []"
        :placeholder="item.placeholder"
        :disabled="item.disabled"
        :clearable="item.clearable"
      />
      <NumberInput
        v-else-if="item.type === 'NUMBER'"
        v-model="data[item.modelKey]"
        :placeholder="item.placeholder"
        :disabled="item.disabled"
        :clearable="item.clearable"
        :min="item.min"
        :max="item.max"
        :step="item.step"
        :precision="item.precision"
        :controls="item.controls"
        :controls-position="item.controlsPosition"
      />
      <DateTimePicker
        v-else-if="item.type === 'DATE' || item.type === 'DATETIME'"
        v-model="data[item.modelKey]"
        :type="item.dateType || (item.type === 'DATETIME' ? 'datetime' : 'date')"
        :placeholder="item.placeholder"
        :disabled="item.disabled"
        :clearable="item.clearable"
        :format="item.format"
        :value-format="item.valueFormat"
        :disabled-date="item.disabledDate"
      />
      <Radio
        v-else-if="item.type === 'RADIO'"
        v-model="data[item.modelKey]"
        :options="item.options ?? []"
        :disabled="item.disabled"
      />
      <Checkbox
        v-else-if="item.type === 'CHECKBOX'"
        v-model="data[item.modelKey]"
        :options="item.options ?? []"
        :disabled="item.disabled"
      />
      <Switch
        v-else-if="item.type === 'SWITCH'"
        v-model="data[item.modelKey]"
        :disabled="item.disabled"
        :active-text="item.activeText"
        :inactive-text="item.inactiveText"
        :active-value="item.activeValue"
        :inactive-value="item.inactiveValue"
        :active-color="item.activeColor"
        :inactive-color="item.inactiveColor"
      />
      <Upload
        v-else-if="item.type === 'UPLOAD'"
        v-model="data[item.modelKey]"
        :action="item.action"
        :headers="item.headers"
        :data="item.data"
        :name="item.name"
        :with-credentials="item.withCredentials"
        :show-upload-list="item.showUploadList"
        :drag="item.drag"
        :accept="item.accept"
        :multiple="item.multiple"
        :limit="item.limit"
        :auto-upload="item.autoUpload"
        :disabled="item.disabled"
        :placeholder="item.placeholder"
        :tip="item.tip"
      />
    </el-form-item>
  </el-form>
</template>

<script lang="ts" setup>
import { ref, toRef } from "vue";
import Input from "./components/Input.vue";
import Select from "./components/Select.vue";
import NumberInput from "./components/NumberInput.vue";
import DateTimePicker from "./components/DateTimePicker.vue";
import Radio from "./components/Radio.vue";
import Checkbox from "./components/Checkbox.vue";
import Switch from "./components/Switch.vue";
import Upload from "./components/Upload.vue";

import { widthAsyncError } from "../../hooks";

import type { IFormConfig } from "./types";
import type { FormInstance } from "element-plus";

const props = defineProps<{
  config: IFormConfig[];
  data: Record<string, any>;
}>();

const data = toRef(props, "data");
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

const resetForm = () => {
  if (!ruleFormRef.value) return;
  ruleFormRef.value.resetFields();
};

defineExpose({
  getFormData,
  resetForm,
});
</script>
