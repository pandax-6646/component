<template>
  <div class="tableHeader">
    <el-tabs v-model="tabActiveRef" @tab-click="tabClick">
      <el-tab-pane
        v-for="item in tabCols"
        :label="item.name"
        :name="item.id"
        :key="item.id"
      />

      <!-- 更多筛选 -->
      <el-tab-pane disabled>
        <template #label>
          <el-dropdown
            popper-class="moreFilterPopper"
            ref="moreFilterDropdownRef"
            placement="bottom-start"
          >
            <span class="moreFilter">
              更多筛选
              <el-icon class="icon"><ArrowDown /></el-icon>
            </span>
            <template #dropdown>
              <div class="moreFilterWrap">
                <div
                  v-for="item in tabMoreFilter"
                  :key="item.key"
                  class="radioGroup"
                >
                  <div class="label">{{ item.name }}：</div>
                  <div
                    class="radio"
                    v-for="radio in item.radioGroup"
                    :key="radio.value"
                    @click="handleRadio(item.key, radio.value)"
                  >
                    {{ radio.label }}
                  </div>
                </div>
              </div>
            </template>
          </el-dropdown>
        </template>
      </el-tab-pane>
    </el-tabs>

    <!-- 快捷搜索框 + 高级搜索 -->
    <div class="searchWrap">
      <el-input
        v-model="searchValueRef"
        placeholder="请输入搜索关键字"
        @blur="submitKeywordSearch"
      >
        <template #append>
          <el-dropdown
            popper-class="advancedSearchPopper"
            ref="advancedSearchDropdownRef"
            placement="bottom-end"
            trigger="click"
          >
            <el-icon>
              <Search />
            </el-icon>
            <template #dropdown>
              <div class="advancedSearchWrap">
                <Form
                  :configs="advancedSearchRef"
                  :data="formData"
                  ref="formRef"
                  :inline="true"
                />

                <!-- 高级搜索按钮 -->
                <div class="advancedSearchBtnWrap">
                  <el-dropdown
                    split-button
                    type="primary"
                    class="saveSearchDropdown"
                    @click="handleAdvancedSearch"
                  >
                    查询
                    <template #dropdown>
                      <el-dropdown-menu>
                        <el-dropdown-item @click="handleSaveSearch(true)">
                          保存查询参数并查询
                        </el-dropdown-item>
                        <el-dropdown-item @click="handleSaveSearch(false)">
                          仅保存查询参数
                        </el-dropdown-item>
                      </el-dropdown-menu>
                    </template>
                  </el-dropdown>
                  <el-button @click="handleAdvancedReset">
                    重置
                  </el-button>
                </div>
              </div>
            </template>
          </el-dropdown>
        </template>
      </el-input>

      <!-- 操作按钮 -->
      <div class="searchBtnWrap">
        <template v-for="{ key, name, isShow, onClick } in searchBtnRef">
          <el-button :key="key" @click="onClick" type="primary" v-if="isShow">
            {{ name }}
          </el-button>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, nextTick } from "vue";
import Form from "@/components/Form/index.vue";

import type {
  TTabCols,
  TColumns,
  TSearchButtonCols,
  TTabMoreFilter,
} from "@/components/Table/types";

const props = defineProps<{
  tabCols: TTabCols[];
  searchButtonCols: TSearchButtonCols[];
  tabMoreFilter: TTabMoreFilter[];
  cols: TColumns[];
  initialAdvancedFilters?: Record<string, unknown>;
}>();

const emit = defineEmits<{
  "tab-change": [tabId: string];
  "more-filter": [payload: { key: string; value: string | number }];
  "keyword-search": [keyword: string];
  "advanced-search": [data: Record<string, unknown>];
  "advanced-search-save": [payload: { data: Record<string, unknown>; search: boolean }];
  "advanced-search-reset": [];
}>();

const tabActiveRef = ref("");
const searchValueRef = ref("");
const searchBtnRef = ref<TSearchButtonCols[]>([]);
const moreFilterDropdownRef = ref();

const advancedSearchDropdownRef = ref();
const advancedSearchRef = ref();
const formData = ref({});
const formRef = ref();


const clearSearchUi = () => {
  searchValueRef.value = "";
  formData.value = {};
  formRef.value?.resetForm();
};

const syncAdvancedForm = (filters?: Record<string, unknown>) => {
  const nextData = filters ? { ...filters } : {};
  formData.value = nextData;
  nextTick(() => {
    formRef.value?.setFormData(nextData);
  });
};

const handleAdvancedReset = () => {
  clearSearchUi();
  emit("advanced-search-reset");
};

const tabClick = () => {
  if (tabActiveRef.value) {
    emit("tab-change", tabActiveRef.value);
  }
};

// 更多筛选：选中一项后一次性写入查询参数并查询
const handleRadio = (key: string, value: string | number) => {
  emit("more-filter", { key, value });
  moreFilterDropdownRef.value?.handleClose();
};

// 关键字：回车提交，一次性查询
const submitKeywordSearch = () => {
  emit("keyword-search", searchValueRef.value.trim());
};

const getAdvancedFormData = async () => {
  const result = await formRef.value?.getFormData();
  if (result && typeof result === "object") {
    return result as Record<string, unknown>;
  }
  return null;
};

// 高级搜索：点击查询按钮后一次性提交
const handleAdvancedSearch = async () => {
  try {
    const data = await getAdvancedFormData();
    if (data) {
      emit("advanced-search", data);
      advancedSearchDropdownRef.value?.handleClose();
    }
  } catch (error) {
    console.log("高级搜索错误", error);
  }
};

// 保存查询参数 / 保存并查询（下拉项）
const handleSaveSearch = async (search: boolean) => {
  try {
    const data = await getAdvancedFormData();
    if (!data) return;
    emit("advanced-search-save", { data, search });
    if (search) {
      advancedSearchDropdownRef.value?.handleClose();
    }
  } catch (error) {
    console.log("保存查询参数错误", error);
  }
};

watch(
  () => props.initialAdvancedFilters,
  (val) => {
    syncAdvancedForm(val);
  },
  { deep: true, immediate: true },
);

watch(
  [() => props.tabCols, () => props.searchButtonCols, () => props.cols],
  ([tabColsVal, searchButtonColsVal, colsVal]) => {
    if (tabColsVal?.length) {
      const initRow = tabColsVal.find((item) => item.initActive);
      tabActiveRef.value = initRow?.id || tabColsVal[0].id;
    }

    if (searchButtonColsVal?.length) {
      searchBtnRef.value = searchButtonColsVal.filter((item) => item.isShow);
    }

    if (colsVal?.length) {
      advancedSearchRef.value = colsVal
        .filter((item) => item?.screenInfo)
        .map((item) => {
          return {
            label: item.label,
            ...item.screenInfo,
            modelKey: item?.screenInfo?.name || "",
          };
        });
    }
  },
  {
    immediate: true,
  },
);
</script>

<style lang="scss" scoped>
.tableHeader {
  text-align: left;
  position: relative;

  :deep(.el-tabs__item.is-disabled) {
    cursor: pointer;
  }

  .moreFilter {
    display: flex;
    align-items: center;

    .icon {
      margin-left: 5px;
    }
  }

  .searchWrap {
    position: absolute;
    right: 0;
    top: 0;

    display: flex;
    align-items: center;

    :deep(.el-input-group__append) {
      padding: 0;
      background: 0 0;

      .el-icon {
        height: 100%;
        padding: 0 8px;
        cursor: pointer;
      }
    }

    .searchBtnWrap {
      margin-left: 15px;
      display: flex;
    }
  }
}

.moreFilterPopper .moreFilterWrap {
  padding: 10px 20px;
  font-size: 14px;
  color: var(--el-text-color-primary);

  .radioGroup {
    display: flex;

    .label {
      font-weight: 700;
    }

    .radio:not(:last-child) {
      margin-right: 15px;
    }

    .radio:hover {
      cursor: pointer;
      color: var(--el-color-primary);
    }
  }

  .radioGroup:not(:last-child) {
    margin-bottom: 10px;
  }
}

.advancedSearchPopper .advancedSearchWrap {
  padding: 20px;
  font-size: 14px;
  color: var(--el-text-color-primary);

  .advancedSearchBtnWrap {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: 10px;
    margin-top: 10px;

    .saveSearchDropdown {
      margin-left: 0;
    }
  }
}

@media (max-width: 1199px) {
  .tableHeader .searchWrap .searchBtnWrap {
    display: none;
  }
}
</style>
