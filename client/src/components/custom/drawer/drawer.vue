<template>
  <Transition name="drawer">
    <div :class="[css.b(_b)]" v-show="show" @click.self="emits('close')">
      <div :class="_container">
        <div :class="css.be(_container, 'header')">
          <slot name="header">Header</slot>
        </div>

        <div :class="css.be(_container, 'body')">
          <slot name="body">Body</slot>
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

<script lang="ts" setup>
import yButton from '@/components/custom/button/button.vue'

import * as css from '@/components/custom/utils/css'

const _b = 'drawer'
const _container = css.be(_b, 'container')
const props = defineProps({
  show: Boolean
})
const emits = defineEmits<{
  (e: 'confirm'): void
  (e: 'close'): void
}>()
</script>

<style lang="postcss" scoped>
@tailwind components;

@layer components {
  .y-drawer {
    @apply fixed inset-0 w-full h-full flex justify-end bg-gray-600 bg-opacity-30 z-30;
    transition: opacity 0.3s ease;
  }

  .y-drawer__container {
    @apply w-4/5 md:w-2/5 h-full px-6 py-4 flex flex-col bg-white shadow z-40;
    transition: all 0.3s ease;
  }

  .y-drawer__container__header {
    @apply text-lg font-bold text-left overflow-y-auto;
  }

  .y-drawer__container__body {
    @apply flex-1 my-5;
  }

  .y-drawer__container__footer {
    @apply text-right space-x-2;
  }
}

.drawer-enter-from {
  opacity: 0;
}

.drawer-leave-to {
  opacity: 0;
}
</style>
