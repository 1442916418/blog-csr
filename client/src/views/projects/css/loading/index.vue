<template>
  <introduce v-bind="CSS_PROJECTS.loading">
    <div class="mx-auto">
      <div class="loading-ring mx-auto w-40 h-40 flex justify-center items-center text-xl rounded-full bg-slate-50">
        Loading
      </div>
    </div>
  </introduce>
</template>

<script lang="ts" setup>
import introduce from '@/components/introduce/index.vue'

import { CSS_PROJECTS } from '@/assets/constant'
</script>

<style lang="postcss" scoped>
.loading-ring {
  position: relative;
}
.loading-ring::after {
  content: '';
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  border-radius: 50%;
  box-shadow: 0 2px 0 #262626;
  animation: ringAnimate 1s linear infinite;
}

@keyframes ringAnimate {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
