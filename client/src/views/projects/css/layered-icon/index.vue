<template>
  <introduce v-bind="CSS_PROJECTS.layeredIcon">
    <div class="mx-auto my-10 w-3/4 flex justify-center items-center">
      <div v-for="i in 5" :key="i" :style="`--color: ${colors[i - 1]}`" class="item mx-10">
        <i
          v-for="j in 5"
          :key="j"
          :style="`--translate: translate(${(j - 1) * 10}px, -${(j - 1) * 10}px); --opacity: ${0.2 * j};`"
          :class="j === 5 ? 'iconfont icon-smile' : ''"
        >
        </i>
      </div>
    </div>
  </introduce>
</template>

<script lang="ts" setup>
import introduce from '@/components/introduce/index.vue'

import { CSS_PROJECTS } from '@/assets/constant'

/** Variable */
const colors = ['#DB2777', '#7C3AED', '#4F46E5', '#2563EB', '#059669']
</script>

<style scoped>
.item {
  position: relative;
  width: 60px;
  height: 60px;
  /* 旋转与倾斜 */
  transform: rotate(-30deg) skew(25deg);
  cursor: pointer;
}

.item i {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
  color: #ffffff;
  font-size: 30px !important;
  background-color: var(--color, '#cccccc');
  transition: 0.5s;
}

.item:hover i {
  box-shadow: -1px 1px 1px rgba(0, 0, 0, 0.1);
}

.item:hover i:nth-child(1) {
  transform: var(--translate);
  opacity: var(--opacity);
}

.item:hover i:nth-child(2) {
  transform: var(--translate);
  opacity: var(--opacity);
}

.item:hover i:nth-child(3) {
  transform: var(--translate);
  opacity: var(--opacity);
}

.item:hover i:nth-child(4) {
  transform: var(--translate);
  opacity: var(--opacity);
}

.item:hover i:nth-child(5) {
  transform: var(--translate);
  opacity: var(--opacity);
}
</style>
