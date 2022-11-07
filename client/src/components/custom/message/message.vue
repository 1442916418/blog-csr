<template>
  <transition name="fade">
    <div v-show="visible" :class="[css.b(_b)]" :style="customStyle">
      <div :class="[css.be(_b, 'content'), css.bm(css.be(_b, 'content'), type)]">
        {{ message }}
      </div>
    </div>
  </transition>
</template>

<script lang="ts" setup>
import { ref, onMounted, computed } from 'vue'
import { useEventListener, useTimeoutFn } from '@vueuse/core'

import { themeType } from '@/components/custom/utils/common'

import * as css from '@/components/custom/utils/css'

/** Variable */
let visible = ref(false)
let stopTimer: (() => void) | undefined = undefined

const _b = 'message'
const props = defineProps({
  type: {
    type: String,
    default: 'default',
    validator: (value?: string) => {
      if (typeof value === 'undefined') return true

      return themeType.includes(value)
    }
  },
  message: {
    type: String,
    required: true
  },
  duration: {
    type: Number,
    default: 3000
  },
  zIndex: {
    type: Number,
    default: 1
  }
})

/** Compute */
const customStyle = computed(() => {
  return { zIndex: props.zIndex }
})

/** Operation */
const startTimer = () => {
  if (!props.duration) return
  ;({ stop: stopTimer } = useTimeoutFn(() => {
    close()
  }, props.duration))
}
const clearTimer = () => stopTimer?.()
const close = () => (visible.value = false)
function keydown({ code }: KeyboardEvent) {
  if (code === 'Escape') {
    close()
  }
}

useEventListener(document, 'keydown', keydown)

/** Lifecycle Hooks */
onMounted(() => {
  startTimer()
  visible.value = true
})

defineExpose({
  visible,
  close
})
</script>

<style lang="postcss" scoped>
@tailwind components;

@layer components {
  .y-message {
    position: fixed;
    left: 50%;
    top: 20px;
    transform: translateX(-50%);
    @apply pt-12 flex justify-center items-start bg-transparent;
    transition: opacity 0.2s, transform 0.3s, top 0.3s;
  }

  .y-message__content {
    border-width: 1px;
    @apply px-4 py-2 text-center text-base text-gray-600 border-gray-200 bg-gray-50 rounded shadow overflow-hidden;
  }

  .y-message__content--success {
    @apply text-green-600 bg-green-50 border-green-200;
  }

  .y-message__content--warning {
    @apply text-yellow-600 bg-yellow-50 border-yellow-200;
  }

  .y-message__content--danger {
    @apply text-red-600 bg-red-50 border-red-200;
  }
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translate(-50%, -100%);
}
</style>
