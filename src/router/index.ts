import { createRouter, createWebHistory } from "vue-router";
import type { RouteRecordRaw } from "vue-router";
import TablePage from "../pages/TablePage.vue";
import FormPage from "../pages/FormPage.vue";

const routes: Array<RouteRecordRaw> = [
  { path: "/", name: "Form", component: FormPage },
  { path: "/table", name: "Table", component: TablePage },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
