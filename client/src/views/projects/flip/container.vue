<template>
  <div class="container" @touchstart="handleTouchstart" :style="styles">
    <div class="flipper">
      <div class="front">
        <slot name="front"></slot>
      </div>
      <div class="back">
        <slot name="back"></slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'

const props = defineProps({
  type: {
    type: String,
    default: 'horizontal',
    required: true,
    validator: function (value: string) {
      return ['horizontal', 'vertical'].includes(value)
    }
  }
})

/** Compute */
const styles = computed(() => {
  return {
    '--transform': props.type === 'horizontal' ? 'rotateY(180deg)' : 'rotateX(180deg)'
  }
})

/** Operation */
const handleTouchstart = (e: TouchEvent) => {
  const target = e.target as HTMLElement

  target?.classList.toggle('hover')
}
</script>

<style scoped>
/* 整个容器，保持透视 */
.container {
  perspective: 1000px;
}

/* 悬停时翻转窗格 */
.container:hover .flipper,
.container.hover .flipper {
  transform: var(--transform);
}

.container,
.flipper,
.front,
.back {
  height: 200px;
}

/* 翻转速度 */
.flipper {
  position: relative;
  transition: 0.6s;
  transform-style: preserve-3d;
}

/* 交换期间隐藏窗格背面 */
.front,
.back {
  position: absolute;
  top: 0;
  left: 0;
  backface-visibility: hidden;
}

/* 前窗格，置于背面上方 */
.front {
  z-index: 2;
}

/* 背面，最初隐藏的窗格 */
.back {
  transform: var(--transform);
}
</style>
