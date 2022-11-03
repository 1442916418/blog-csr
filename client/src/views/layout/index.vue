<template>
  <div class="container-box">
    <header-container />

    <router-view />

    <footer-container />
  </div>
</template>

<script lang="ts" setup>
import { RouterView } from 'vue-router'
import headerContainer from '@/components/header/index.vue'
import footerContainer from '@/components/footer/index.vue'
</script>

<style scoped>
.container-box {
  @apply xl:mx-60 2xl:mx-80;
}
</style>
