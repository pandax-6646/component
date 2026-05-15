<template>
  <div class="app">
    <nav class="nav-links">
      <router-link to="/" class="nav-link">表单</router-link>
      <router-link to="/table" class="nav-link">表格</router-link>
    </nav>

    <router-view />
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.app {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  gap: 20px;
}

.nav-links {
  display: flex;
  gap: 12px;
}

.nav-link {
  color: #c8c8c8;
  font-weight: 600;
  text-decoration: none;
}

.nav-link.router-link-active {
  color: #409eff;
}
</style>
