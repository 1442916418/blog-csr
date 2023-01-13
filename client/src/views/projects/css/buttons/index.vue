<template>
  <introduce v-bind="CSS_PROJECTS.buttons">
    <div class="mx-auto p-5 flex flex-col justify-center items-center space-y-4 bg-gray-600">
      <button class="w-36 h-14 relative text-pink-200 bg-none outline">BUTTON</button>
    </div>
  </introduce>
</template>

<script lang="ts" setup>
import introduce from '@/components/introduce/index.vue'

import { CSS_PROJECTS } from '@/assets/constant'
</script>

<style scoped>
button::before,
button::after {
  content: '';
  position: absolute;
  width: 14px;
  height: 4px;
  background: #4b5563;
  transform: skewX(50deg);
  transition: 0.4s linear;
}
button::before {
  top: -4px;
  left: 10%;
}
button::after {
  bottom: -4px;
  right: 10%;
}
button:hover::before {
  left: 80%;
}
button:hover::after {
  right: 80%;
}
</style>
