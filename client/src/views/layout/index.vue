<template>
  <div class="app-container">
    <div class="app-container-content">
      <header-container />

      <router-view v-slot="{ Component }">
        <keep-alive>
          <component :is="Component" v-if="route.meta.keepAlive" :key="route.name" />
        </keep-alive>
        <component :is="Component" v-if="!route.meta.keepAlive" :key="route.name" />
      </router-view>

      <footer-container />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { RouterView, useRoute } from 'vue-router'
import headerContainer from '@/components/header/index.vue'
import footerContainer from '@/components/footer/index.vue'

const route = useRoute()
</script>

<style>
.app-container {
  @apply min-w-full min-h-screen dark:bg-gray-800 dark:text-gray-50;
}
.app-container-content {
  @apply xl:mx-60 2xl:mx-80;
}

input {
  @apply dark:text-gray-600;
}
textarea {
  @apply dark:text-gray-600;
}
</style>
