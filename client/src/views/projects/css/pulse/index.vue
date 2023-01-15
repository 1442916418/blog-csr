<template>
  <introduce v-bind="CSS_PROJECTS.pulse">
    <div class="p-4 flex justify-center items-center">
      <div class="pulse w-32 h-32 flex justify-center items-center rounded-full bg-blue-600 text-white">PULSE</div>
    </div>
  </introduce>
</template>

<script lang="ts" setup>
import introduce from '@/components/introduce/index.vue'

import { CSS_PROJECTS } from '@/assets/constant'
</script>

<style scoped>
.pulse {
  animation: pulseAnimate 3s linear infinite;
}

@keyframes pulseAnimate {
  0% {
    box-shadow: 0 0 0 0 rgba(37, 99, 235, 0.7), 0 0 0 0 rgba(31, 81, 190, 0.7);
  }
  40% {
    box-shadow: 0 0 0 50px rgba(37, 99, 235, 0), 0 0 0 0 rgba(37, 99, 235, 0.7);
  }
  80% {
    box-shadow: 0 0 0 50px rgba(37, 99, 235, 0), 0 0 0 30px rgba(37, 99, 235, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(37, 99, 235, 0), 0 0 0 30px rgba(37, 99, 235, 0);
  }
}
</style>
