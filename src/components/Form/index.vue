<template>
  <!-- <el-form :model="form" label-width="auto">
    <el-form-item label="文本框">
      <el-input v-model="form.name" />
    </el-form-item>
    <el-form-item label="Activity zone">
      <el-select v-model="form.region" placeholder="please select your zone">
        <el-option label="Zone one" value="shanghai" />
        <el-option label="Zone two" value="beijing" />
      </el-select>
    </el-form-item>
    <el-form-item label="Activity time">
      <el-col :span="11">
        <el-date-picker
          v-model="form.date1"
          type="date"
          placeholder="Pick a date"
          style="width: 100%"
        />
      </el-col>
      <el-col :span="2" class="text-center">
        <span class="text-gray-500">-</span>
      </el-col>
      <el-col :span="11">
        <el-time-picker
          v-model="form.date2"
          placeholder="Pick a time"
          style="width: 100%"
        />
      </el-col>
    </el-form-item>
    <el-form-item label="Instant delivery">
      <el-switch v-model="form.delivery" />
    </el-form-item>
    <el-form-item label="Activity type">
      <el-checkbox-group v-model="form.type">
        <el-checkbox value="Online activities" name="type">
          Online activities
        </el-checkbox>
        <el-checkbox value="Promotion activities" name="type">
          Promotion activities
        </el-checkbox>
        <el-checkbox value="Offline activities" name="type">
          Offline activities
        </el-checkbox>
        <el-checkbox value="Simple brand exposure" name="type">
          Simple brand exposure
        </el-checkbox>
      </el-checkbox-group>
    </el-form-item>
    <el-form-item label="Resources">
      <el-radio-group v-model="form.resource">
        <el-radio value="Sponsor">Sponsor</el-radio>
        <el-radio value="Venue">Venue</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="Activity form">
      <el-input v-model="form.desc" type="textarea" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">Create</el-button>
      <el-button>Cancel</el-button>
    </el-form-item>
  </el-form> -->

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
      <Input v-if="item.type === 'INPUT'" v-model="data[item.modelKey]" />
    </el-form-item>
  </el-form>
</template>

<script lang="ts" setup>
import { ref, toRef } from "vue";
import Input from "./components/Input.vue";
import type { IFormConfig } from "./types";
import type { FormInstance } from "element-plus";
import { widthAsyncError } from "../../hooks";

const props = defineProps<{
  config: IFormConfig[];
  data: Record<string, any>;
}>();

const data = toRef(props, "data");
const ruleFormRef = ref<FormInstance>();

/**
 * 获取参数
 * @param isCheck 是否校验必填参数
 */
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

// 重置表单
const resetForm = () => {
  if (!ruleFormRef.value) return;
  ruleFormRef.value.resetFields();
};

defineExpose({
  getFormData,
  resetForm,
});
</script>
