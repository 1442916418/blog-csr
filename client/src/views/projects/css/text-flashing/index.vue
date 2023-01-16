<template>
  <introduce v-bind="CSS_PROJECTS.textFlashing">
    <div class="h-40 flex justify-center items-center bg-black">
      <div class="flex text-2xl font-bold text-gray-400" :style="{ '--all-second': (text.length + 2) / 10 + 's' }">
        <template v-for="(k, i) in text" :key="k + i">
          <span class="text" :style="{ 'animation-delay': i / 10 + 's' }">{{ k }}</span>
        </template>
      </div>
    </div>
  </introduce>
</template>

<script lang="ts" setup>
import introduce from '@/components/introduce/index.vue'

import { CSS_PROJECTS } from '@/assets/constant'

/** Variable */
const text = 'ANIMATION-DELAY'
</script>

<style scoped>
.text {
  animation: flashing var(--all-second) linear infinite;
}

@keyframes flashing {
  0% {
    color: rgba(156, 163, 175, 1);
    text-shadow: none;
  }
  90% {
    color: rgba(156, 163, 175, 1);
    text-shadow: none;
  }
  100% {
    color: #fff900;
    text-shadow: 0 0 7px #fff900, 0 0 50px #ff6c00;
  }
}
</style>
