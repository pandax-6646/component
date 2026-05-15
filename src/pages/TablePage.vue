<template>
  <div class="page-home">
    <h2>首页</h2>
    <p>这是一个简单的路由示例，点击下面按钮切换到表单页面。</p>
    <router-link to="/">
      <el-button type="primary">去表单页面</el-button>
    </router-link>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.page-home {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  padding: 40px;
}
</style>
