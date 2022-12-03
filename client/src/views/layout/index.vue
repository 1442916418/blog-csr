<template>
  <!-- <skeleton-component v-bind="skeletonProps"> -->
  <div class="app-container">
    <div class="app-container-content">
      <header-container />

      <router-view v-slot="{ Component, route }">
        <keep-alive>
          <component :is="Component" v-if="route.meta.keepAlive" :key="route.name" />
        </keep-alive>

        <component :is="Component" v-if="!route.meta.keepAlive" :key="route.name" />
      </router-view>

      <footer-container />
    </div>
  </div>
  <!-- </skeleton-component> -->

  <network-vue v-show="isShow" />
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { RouterView } from 'vue-router'
import { useNetwork } from '@vueuse/core'
import { useSkeletonStore } from '@/stores/skeleton'

import networkVue from '@/views/exception/network.vue'

import headerContainer from '@/components/header/index.vue'
import footerContainer from '@/components/footer/index.vue'
import skeletonComponent from '@/components/custom/skeleton/skeleton'

/** Use of external methods */
const network = useNetwork()
const skeleton = useSkeletonStore()
const skeletonProps = computed(() => {
  return {
    show: skeleton.loading,
    excludeClassName: ['drawer', 'modal', 'message', 'pagination', 'svg', 'mobile'],
    excludeElements: ['i', 'svg'],
    throttle: 0
  }
})
const isShow = computed(() => !network.isOnline.value)
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

.g-skeleton {
  color: transparent !important;
  border-color: transparent !important;
  background-color: transparent !important;
  background-image: linear-gradient(90deg, #f2f2f2 25%, #e6e6e6 37%, #f2f2f2 63%) !important;
  background-size: 400% 100%;
  animation: skeleton-loading 1.2s ease-in infinite;
}

.g-skeleton svg {
  color: transparent !important;
  display: none !important;
}

@keyframes skeleton-loading {
  from {
    background-position: 100% 50%;
  }
  to {
    background-position: 0 50%;
  }
}
</style>
