<template>
  <introduce v-bind="CSS_PROJECTS.textSliding">
    <div class="mx-auto h-80 relative">
      <div class="w-full h-full overflow-hidden absolute bg-yellow-400">
        <span class="sliding">Smart WebP, PNG and JPEG compression</span>
        <div class="w-2/4 h-full text-yellow-400 bg-red-400 overflow-hidden absolute top-0 left-0">
          <span class="sliding">Smart WebP, PNG and JPEG compression</span>
        </div>
      </div>
    </div>
  </introduce>
</template>

<script lang="ts" setup>
import introduce from '@/components/introduce/index.vue'

import { CSS_PROJECTS } from '@/assets/constant'
</script>

<style lang="postcss" scoped>
.sliding {
  position: absolute;
  top: 50%;
  white-space: nowrap;
  font-size: 12em;
  line-height: 220px;
  overflow: hidden;
  animation: animate 20s linear infinite;
}
@keyframes animate {
  0% {
    transform: translate(0, -50%);
  }
  100% {
    transform: translate(-50%, -50%);
  }
}
</style>
