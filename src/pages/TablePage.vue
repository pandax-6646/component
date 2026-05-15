<template>
  <div class="page-home">
    <el-table :data="tableData" max-height="250">
      <template v-for="{ prop, label, width, fixed } in columns" :key="prop">
        <el-table-column
          :prop="prop"
          :label="label"
          :width="width || 120"
          column-key="id"
          :fixed="fixed"
        />

        <el-table-column
          v-if="prop === type"
          :width="width || 120"
          :fixed="fixed"
        >
          <template #header>
            <el-icon size="20">
              <Operation />
            </el-icon>
          </template>

          <template #default="{ row }">
            <el-button @click="() => console.log(row)" type="text" size="small"
              >查看</el-button
            >
            <el-button @click="() => console.log(row)" type="text" size="small"
              >编辑</el-button
            >
          </template>
        </el-table-column></template
      >
    </el-table>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const type = "operations";

const columns = ref<
  { prop: string; label?: string; width?: number; [key: string]: any }[]
>([
  { prop: "date", label: "Date" },
  { prop: "name", label: "Name" },
  { prop: "state", label: "State" },
  { prop: "city", label: "City" },
  { prop: "address", label: "Address" },
  { prop: "zip", label: "Zip" },
  { prop: type, width: 160 },
]);

const tableData = ref([
  {
    id: 1,
    date: "2016-05-01",
    name: "Tom",
    state: "California",
    city: "Los Angeles",
    address: "No. 189, Grove St, Los Angeles",
    zip: "CA 90036",
  },
  {
    id: 2,
    date: "2016-05-02",
    name: "Tom",
    state: "California",
    city: "Los Angeles",
    address: "No. 189, Grove St, Los Angeles",
    zip: "CA 90036",
  },
  {
    id: 3,
    date: "2016-05-03",
    name: "Tom",
    state: "California",
    city: "Los Angeles",
    address: "No. 189, Grove St, Los Angeles",
    zip: "CA 90036",
  },
]);
</script>

<style scoped>
.page-home {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  padding: 40px;
}
</style>
