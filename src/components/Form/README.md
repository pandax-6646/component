# Form 表单组件

## 概述

Form 是一个基于 Element Plus 封装的高性能表单组件，支持通过配置化方式快速构建复杂表单。该组件采用声明式 API，将表单配置与业务逻辑解耦，极大提升开发效率。

## 特性

- ⚡ **配置化开发**：通过 JSON 配置快速构建表单
- 🎨 **多组件支持**：内置 9 种表单组件类型
- ✅ **表单验证**：支持 Element Plus 验证规则
- 🔗 **数据联动**：支持表单字段间的联动显示/隐藏
- 📦 **类型安全**：完整的 TypeScript 类型定义

## 安装与导入

### 安装依赖

```bash
npm install element-plus
```

### 全局注册（可选）

```typescript
import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

const app = createApp(App)
app.use(ElementPlus)
```

### 导入组件

```vue
<template>
  <Form :configs="formConfig" :data="formData" ref="formRef" />
</template>

<script setup lang="ts">
import Form from '@/components/Form/index.vue'
import type { IFormConfigs } from '@/components/Form/types'
</script>
```

## 基本使用

```vue
<template>
  <Form :configs="formConfig" :data="formData" ref="formRef" />
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import Form from '@/components/Form/index.vue'

const formRef = ref()

const formData = reactive({
  name: '',
  email: '',
  age: null
})

const formConfig = reactive([
  {
    label: '姓名',
    type: 'INPUT',
    modelKey: 'name',
    placeholder: '请输入姓名',
    rules: [{ required: true, message: '请输入姓名', trigger: 'blur' }]
  },
  {
    label: '邮箱',
    type: 'INPUT',
    modelKey: 'email',
    placeholder: '请输入邮箱',
    rules: [
      { required: true, message: '请输入邮箱', trigger: 'blur' },
      { type: 'email', message: '请输入正确的邮箱格式', trigger: 'blur' }
    ]
  },
  {
    label: '年龄',
    type: 'NUMBER',
    modelKey: 'age',
    placeholder: '请输入年龄',
    min: 1,
    max: 150
  }
])

const handleSubmit = async () => {
  const [data, error] = await formRef.value?.getFormData(true)
  if (data) {
    console.log('表单数据:', data)
  }
}
</script>
```

## 属性配置

### Form 组件属性

| 属性名  | 类型                    | 必填 | 默认值 | 说明         |
| ------- | ----------------------- | ---- | ------ | ------------ |
| configs | `IFormConfigs[]`      | 是   | -      | 表单配置数组 |
| data    | `Record<string, any>` | 是   | -      | 表单数据对象 |

### 通用字段配置（TPublicFormConfigs）

| 属性名      | 类型                     | 必填 | 默认值    | 说明                       |
| ----------- | ------------------------ | ---- | --------- | -------------------------- |
| label       | `string`               | 是   | -         | 表单标签                   |
| type        | `TFormType`            | 是   | -         | 组件类型                   |
| modelKey    | `string`               | 是   | -         | 数据绑定键名               |
| placeholder | `string`               | 否   | -         | 占位符文本                 |
| disabled    | `boolean`              | 否   | `false` | 是否禁用                   |
| clearable   | `boolean`              | 否   | `false` | 是否可清空                 |
| rules       | `Array<FormRule>`      | 否   | -         | 验证规则                   |
| change      | `(value: any) => void` | 否   | -         | 值变化回调                 |
| isShow      | `boolean \| Function`   | 否   | `true`  | 是否显示，支持函数动态判断 |

### 表单组件类型（TFormType）

| 类型     | 说明       | 支持的额外配置 |
| -------- | ---------- | -------------- |
| INPUT    | 文本输入框 | `TText`      |
| SELECT   | 下拉选择框 | `TSelect`    |
| NUMBER   | 数字输入框 | `TNumber`    |
| DATE     | 日期选择器 | `TDateTime`  |
| RADIO    | 单选框组   | `TSelect`    |
| CHECKBOX | 多选框组   | `TSelect`    |
| SWITCH   | 开关组件   | `TSwitch`    |
| UPLOAD   | 文件上传   | `TUpload`    |
| READONLY | 只读文本   | -              |

### 文本输入框配置（TText）

| 属性名            | 类型                                 | 默认值       | 说明             |
| ----------------- | ------------------------------------ | ------------ | ---------------- |
| rows              | `number`                           | -            | 文本域行数       |
| showPassword      | `boolean`                          | `false`    | 是否显示密码切换 |
| readonly          | `boolean`                          | `false`    | 是否只读         |
| maxlength         | `number`                           | -            | 最大长度         |
| inputType         | `'textarea' \| 'text' \| 'password'` | `'text'`   | 输入类型         |
| showWordLimit     | `boolean`                          | `false`    | 是否显示字数统计 |
| wordLimitPosition | `'inside' \| 'outside'`             | `'bottom'` | 字数统计位置     |

### 选择框配置（TSelect）

| 属性名  | 类型                                                          | 默认值 | 说明     |
| ------- | ------------------------------------------------------------- | ------ | -------- |
| options | `Array<{label: string; value: string; disabled?: boolean}>` | -      | 选项列表 |

### 数字输入框配置（TNumber）

| 属性名           | 类型                    | 默认值        | 说明             |
| ---------------- | ----------------------- | ------------- | ---------------- |
| min              | `number`              | -             | 最小值           |
| max              | `number`              | -             | 最大值           |
| step             | `number`              | `1`         | 步长             |
| precision        | `number`              | -             | 精度             |
| controls         | `boolean`             | `true`      | 是否显示控制按钮 |
| controlsPosition | `'right' \| 'default'` | `'default'` | 控制按钮位置     |

### 日期选择器配置（TDateTime）

| 属性名       | 类型                                                | 默认值     | 说明         |
| ------------ | --------------------------------------------------- | ---------- | ------------ |
| dateType     | `'date' \| 'datetime' \| 'week' \| 'month' \| 'year'` | `'date'` | 选择器类型   |
| format       | `string`                                          | -          | 显示格式     |
| valueFormat  | `string`                                          | -          | 值格式       |
| disabledDate | `(date: Date) => boolean`                         | -          | 禁用日期函数 |

### 开关配置（TSwitch）

| 属性名        | 类型                          | 默认值    | 说明           |
| ------------- | ----------------------------- | --------- | -------------- |
| activeText    | `string`                    | -         | 激活状态文本   |
| inactiveText  | `string`                    | -         | 非激活状态文本 |
| activeValue   | `boolean \| number \| string` | `true`  | 激活值         |
| inactiveValue | `boolean \| number \| string` | `false` | 非激活值       |
| activeColor   | `string`                    | -         | 激活状态颜色   |
| inactiveColor | `string`                    | -         | 非激活状态颜色 |

### 文件上传配置（TUpload）

| 属性名          | 类型                       | 默认值     | 说明             |
| --------------- | -------------------------- | ---------- | ---------------- |
| action          | `string`                 | -          | 上传地址         |
| headers         | `Record<string, string>` | -          | 请求头           |
| data            | `Record<string, any>`    | -          | 额外数据         |
| name            | `string`                 | `'file'` | 文件字段名       |
| withCredentials | `boolean`                | `false`  | 是否携带凭证     |
| showUploadList  | `boolean`                | `true`   | 是否显示上传列表 |
| drag            | `boolean`                | `false`  | 是否支持拖拽     |
| accept          | `string`                 | -          | 接受的文件类型   |
| multiple        | `boolean`                | `false`  | 是否支持多选     |
| limit           | `number`                 | -          | 最大上传数量     |
| autoUpload      | `boolean`                | `true`   | 是否自动上传     |
| tip             | `string`                 | -          | 提示信息         |

## 事件

| 事件名      | 参数                           | 说明               |
| ----------- | ------------------------------ | ------------------ |
| update:data | `value: Record<string, any>` | 表单数据更新时触发 |

## 方法

通过 `ref` 调用 Form 组件的方法：

```typescript
const formRef = ref<InstanceType<typeof Form>>()

// 获取表单数据
const data = await formRef.value?.getFormData(true)

// 重置表单
formRef.value?.resetForm()

// 设置表单数据
formRef.value?.setFormData({ name: 'test' })

// 更新配置（用于联动）
formRef.value?.updateConfigs(newConfigs, currentData)

// 校验指定字段
formRef.value?.validateFields([
  { prop: 'name', callback: (valid, fields) => {} }
])
```

### getFormData

获取表单数据，可选择是否校验。

**参数：**

| 参数名  | 类型        | 必填 | 默认值    | 说明             |
| ------- | ----------- | ---- | --------- | ---------------- |
| isCheck | `boolean` | 否   | `false` | 是否进行表单校验 |

**返回值：** `Promise<Record<string, any> \| boolean>`

### resetForm

重置表单到初始状态。

**参数：** 无

**返回值：** `void`

### setFormData

设置表单数据。

**参数：**

| 参数名   | 类型                    | 必填 | 说明             |
| -------- | ----------------------- | ---- | ---------------- |
| formData | `Record<string, any>` | 是   | 要设置的表单数据 |

**返回值：** `void`

### updateConfigs

更新表单配置，支持动态显示/隐藏字段。

**参数：**

| 参数名  | 类型                    | 必填 | 说明         |
| ------- | ----------------------- | ---- | ------------ |
| configs | `IFormConfigs[]`      | 是   | 新的表单配置 |
| data    | `Record<string, any>` | 是   | 当前表单数据 |

**返回值：** `void`

### validateFields

校验指定字段。

**参数：**

| 参数名 | 类型                                                      | 必填 | 说明             |
| ------ | --------------------------------------------------------- | ---- | ---------------- |
| fields | `Array<{prop: string; callback: FormValidateCallback}>` | 是   | 要校验的字段列表 |

**返回值：** `void`

## 高级用法

### 表单联动

通过 `isShow` 属性实现字段间的联动：

```typescript
const formConfig = reactive([
  {
    label: '用户类型',
    type: 'SELECT',
    modelKey: 'userType',
    options: [
      { label: '个人', value: 'personal' },
      { label: '企业', value: 'enterprise' }
    ]
  },
  {
    label: '企业名称',
    type: 'INPUT',
    modelKey: 'companyName',
    isShow: (data: Record<string, any>) => data.userType === 'enterprise',
    rules: [{ required: true, message: '请输入企业名称', trigger: 'blur' }]
  },
  {
    label: '营业执照',
    type: 'UPLOAD',
    modelKey: 'license',
    isShow: (data: Record<string, any>) => data.userType === 'enterprise',
    action: '/api/upload'
  }
])
```

### 自定义验证规则

```typescript
{
  label: '用户名',
  type: 'INPUT',
  modelKey: 'username',
  rules: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    {
      validator: (rule: any, value: any, callback: any) => {
        if (value === 'admin') {
          callback(new Error('用户名不能为 admin'))
        } else {
          callback()
        }
      },
      trigger: 'blur'
    }
  ]
}
```

## 完整示例

```vue
<template>
  <div class="form-container">
    <Form
      :configs="formConfig"
      :data="formData"
      ref="formRef"
      @update:data="handleDataChange"
    />
  
    <div class="form-actions">
      <el-button type="primary" @click="handleSubmit">提交</el-button>
      <el-button @click="handleReset">重置</el-button>
      <el-button @click="handleSetData">设置数据</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import Form from '@/components/Form/index.vue'

const formRef = ref()

const formData = reactive({
  name: '',
  gender: '',
  hobbies: [],
  age: null,
  birthday: null,
  enabled: false,
  avatar: []
})

const formConfig = reactive([
  {
    label: '姓名',
    type: 'INPUT',
    modelKey: 'name',
    placeholder: '请输入姓名',
    showWordLimit: true,
    maxlength: 20,
    rules: [{ required: true, message: '请输入姓名', trigger: 'blur' }]
  },
  {
    label: '性别',
    type: 'RADIO',
    modelKey: 'gender',
    options: [
      { label: '男', value: 'male' },
      { label: '女', value: 'female' }
    ],
    rules: [{ required: true, message: '请选择性别', trigger: 'change' }]
  },
  {
    label: '爱好',
    type: 'CHECKBOX',
    modelKey: 'hobbies',
    options: [
      { label: '阅读', value: 'reading' },
      { label: '运动', value: 'sports' },
      { label: '音乐', value: 'music' }
    ]
  },
  {
    label: '年龄',
    type: 'NUMBER',
    modelKey: 'age',
    placeholder: '请输入年龄',
    min: 1,
    max: 150,
    controls: true
  },
  {
    label: '出生日期',
    type: 'DATE',
    modelKey: 'birthday',
    placeholder: '请选择出生日期',
    valueFormat: 'YYYY-MM-DD'
  },
  {
    label: '启用状态',
    type: 'SWITCH',
    modelKey: 'enabled',
    activeText: '启用',
    inactiveText: '禁用'
  },
  {
    label: '头像上传',
    type: 'UPLOAD',
    modelKey: 'avatar',
    action: '/api/upload',
    accept: 'image/*',
    limit: 1,
    tip: '请上传头像图片'
  }
])

const handleDataChange = (data: Record<string, any>) => {
  console.log('数据变更:', data)
}

const handleSubmit = async () => {
  const [data, error] = await formRef.value?.getFormData(true)
  if (data) {
    console.log('表单数据:', data)
    // 提交逻辑...
  }
}

const handleReset = () => {
  formRef.value?.resetForm()
}

const handleSetData = () => {
  formRef.value?.setFormData({
    name: '张三',
    gender: 'male',
    age: 25
  })
}
</script>

<style scoped>
.form-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}

.form-actions {
  margin-top: 20px;
  display: flex;
  gap: 10px;
}
</style>
```

## 类型导出

```typescript
export type TFormType = 'INPUT' | 'SELECT' | 'DATE' | 'CHECKBOX' | 'RADIO' | 'NUMBER' | 'SWITCH' | 'READONLY' | 'UPLOAD'

export type TDateType = 'date' | 'datetime' | 'week' | 'month' | 'year'

export interface IFormConfigs {
  // 通用配置
  label: string
  type: TFormType
  modelKey: string
  placeholder?: string
  disabled?: boolean
  clearable?: boolean
  rules?: Array<{
    required?: boolean
    message?: string
    trigger: string
    validator?: (rule: any, value: any, callback: (error?: Error) => void) => void
  }>
  change?: (value: any) => void
  isShow?: boolean | Function
  
  // 文本配置
  rows?: number
  showPassword?: boolean
  readonly?: boolean
  maxlength?: number
  inputType?: 'textarea' | 'text' | 'password'
  showWordLimit?: boolean
  wordLimitPosition?: 'inside' | 'outside'
  
  // 选择配置
  options?: Array<{ label: string; value: string; disabled?: boolean }>
  
  // 数字配置
  min?: number
  max?: number
  step?: number
  precision?: number
  controls?: boolean
  controlsPosition?: 'right' | 'default'
  
  // 日期配置
  dateType?: TDateType
  format?: string
  valueFormat?: string
  disabledDate?: (date: Date) => boolean
  
  // 开关配置
  activeText?: string
  inactiveText?: string
  activeValue?: boolean | number | string
  inactiveValue?: boolean | number | string
  activeColor?: string
  inactiveColor?: string
  
  // 上传配置
  action?: string
  headers?: Record<string, string>
  data?: Record<string, any>
  name?: string
  withCredentials?: boolean
  showUploadList?: boolean
  drag?: boolean
  accept?: string
  multiple?: boolean
  limit?: number
  autoUpload?: boolean
  tip?: string
}
```
