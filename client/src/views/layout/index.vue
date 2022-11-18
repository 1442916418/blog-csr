<template>
  <div class="app-container">
    <div class="app-container-content">
      <skeleton-component :show="true">
        <header-container />

        <router-view v-slot="{ Component }">
          <keep-alive>
            <component :is="Component" v-if="route.meta.keepAlive" :key="route.name" />
          </keep-alive>

          <component :is="Component" v-if="!route.meta.keepAlive" :key="route.name" />
        </router-view>

        <footer-container />
      </skeleton-component>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { RouterView, useRoute } from 'vue-router'
import headerContainer from '@/components/header/index.vue'
import footerContainer from '@/components/footer/index.vue'
// @ts-ignore
import skeletonComponent from '@/components/custom/skeleton/skeleton.js'

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

/* .g-skeleton {
  min-height: 0.3rem;
  min-width: 1rem;
  background-color: transparent !important;
  background-image: linear-gradient(90deg, #f2f2f2 25%, #e6e6e6 37%, #f2f2f2 63%) !important;
  background-size: 400% 100%;
  animation: skeleton-loading 1.5s ease-in infinite;
}

@keyframes skeleton-loading {
  from {
    background-position: 100% 50%;
  }
  to {
    background-position: 0 50%;
  }
} */
</style>
