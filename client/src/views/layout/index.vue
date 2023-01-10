<template>
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

  <network-vue v-show="isShow" />

  <github-component />
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { RouterView } from 'vue-router'
import { useNetwork } from '@vueuse/core'

import networkVue from '@/views/exception/network.vue'

import headerContainer from '@/components/header/index.vue'
import footerContainer from '@/components/footer/index.vue'
import githubComponent from '@/components/github/index.vue'

/** Use of external methods */
const network = useNetwork()

const isShow = computed(() => !network.isOnline.value)
</script>

<style>
@import './index.css';
</style>
