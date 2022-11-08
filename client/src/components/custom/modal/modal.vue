<template>
  <Transition name="modal">
    <div v-if="show" :class="[css.b(_b)]">
      <div :class="_container">
        <div :class="css.be(_container, 'header')">
          <slot name="header">提 示</slot>
        </div>

        <div :class="css.be(_container, 'body')">
          <slot name="body">default body</slot>
        </div>

        <div :class="css.be(_container, 'footer')">
          <slot name="footer">
            <y-button @click="emits('close')">取 消</y-button>
            <y-button type="primary" @click="emits('confirm')">确 定</y-button>
          </slot>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import * as css from '@/components/custom/utils/css'
import { useEventListener } from '@vueuse/core'

import yButton from '@/components/custom/button/button.vue'

const _b = 'modal'
const _container = css.be(_b, 'container')
const props = defineProps({
  show: Boolean,
  escapeClose: {
    type: Boolean,
    default: true
  }
})
const emits = defineEmits<{
  (e: 'confirm'): void
  (e: 'close'): void
}>()

function keydown({ code }: KeyboardEvent) {
  if (code === 'Escape' && props.escapeClose) {
    emits('close')
  }
}

useEventListener(document, 'keydown', keydown)
</script>

<style lang="postcss" scoped>
@tailwind components;

@layer components {
  .y-modal {
    @apply fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-600 bg-opacity-30 z-50;
    transition: opacity 0.3s ease;
  }

  .y-modal__container {
    @apply w-3/4 md:w-2/5 lg:w-2/6 xl:w-2/6 2xl:w-2/6 px-8 py-5 rounded bg-white shadow;
    transition: all 0.3s ease;
  }

  .y-modal__container__header {
    @apply text-lg font-bold text-left;
  }

  .y-modal__container__body {
    @apply my-5;
  }

  .y-modal__container__footer {
    @apply text-right space-x-2;
  }
}

.modal-enter-from {
  opacity: 0;
}

.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .y-modal__container,
.modal-leave-to .y-modal__container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>
