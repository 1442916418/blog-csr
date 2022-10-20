<template>
  <div class="common-layout">
    <el-container>
      <el-header>
        <header-container />
      </el-header>

      <el-main>
        <router-view />
      </el-main>

      <el-footer>
        <footer-container />
      </el-footer>
    </el-container>
  </div>
</template>

<script lang="ts" setup>
import { RouterView } from 'vue-router'
import headerContainer from '@/components/header/index.vue'
import footerContainer from '@/components/footer/index.vue'
</script>

<style lang="scss" scoped>
@import '@/views/layout/index.scss';
</style>
