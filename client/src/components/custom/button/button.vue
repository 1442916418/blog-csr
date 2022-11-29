<template>
  <button :class="buttonClass" @click="emits('click', $event)" :disabled="disabled" :aria-disabled="disabled">
    <loading-component :loading="loading" />
    <slot></slot>
  </button>
</template>

<script lang="ts" setup>
import { computed } from 'vue'

import { themeType, themeSize } from '@/components/custom/utils/common'
import * as css from '@/components/custom/utils/css'

import loadingComponent from '@/components/custom/loading/loading'

/** Variable */
const _b = 'button'
const props = defineProps({
  type: {
    type: String,
    default: 'default',
    validator: (value?: string) => {
      if (typeof value === 'undefined') return true

      return themeType.includes(value)
    }
  },
  size: {
    type: String,
    default: 'default',
    validator: (value?: string) => {
      if (typeof value === 'undefined') return true

      return themeSize.includes(value)
    }
  },
  plain: Boolean,
  round: Boolean,
  link: Boolean,
  circle: Boolean,
  loading: Boolean,
  disabled: Boolean
})
const emits = defineEmits<{
  (e: 'click', event: MouseEvent): void
}>()

/** Compute */
const buttonClass = computed(() => {
  return [
    css.b(_b),
    css.bm(_b, props.type),
    css.bm(_b, props.size),
    css.is('plain', props.plain),
    css.is('round', props.round),
    css.is('link', props.link),
    css.is('circle', props.circle),
    css.is('disabled', props.disabled)
  ]
})
</script>

<style lang="postcss" scoped>
@tailwind components;

@layer components {
  .y-button {
    border-width: 1px;
    @apply px-4 py-2 inline-block text-base font-medium text-gray-600 rounded-md bg-white border-solid border-gray-600;
    @apply hover:text-blue-600 hover:bg-blue-100 hover:border-blue-400 active:border-blue-600;
  }

  .y-button.is-round {
    @apply rounded-full;
  }

  .y-button.is-link {
    @apply px-1 py-0 bg-transparent border-transparent hover:text-gray-600 active:text-gray-500;
  }

  .y-button.is-circle {
    @apply w-6 h-6 p-0 rounded-full;
  }
  .y-button.is-disabled {
    @apply disabled:opacity-50 cursor-not-allowed;
  }

  .y-button--large {
    @apply px-5 py-3 text-lg;
  }
  .y-button--small {
    @apply px-2 py-1 text-xs;
  }

  .y-button--primary {
    @apply text-white bg-blue-600 border-blue-600 hover:bg-blue-500 hover:text-white active:bg-blue-600;
  }

  .y-button--primary.is-plain {
    @apply text-blue-500 bg-blue-100 border-blue-300 hover:bg-blue-500 hover:text-white active:bg-blue-600;
  }

  .y-button--primary.is-link {
    @apply text-blue-600 bg-transparent border-transparent hover:text-blue-500 active:text-blue-600 dark:text-blue-50;
  }

  .y-button--success {
    @apply text-white bg-green-600 border-green-600 hover:bg-green-500 hover:text-white hover:border-green-600 active:bg-green-600;
  }

  .y-button--success.is-plain {
    @apply text-green-500 bg-green-100 border-green-300 hover:bg-green-500 hover:text-white hover:border-green-600 active:bg-green-600;
  }

  .y-button--success.is-link {
    @apply text-green-600 bg-transparent border-transparent hover:text-green-500 active:text-green-600 dark:text-green-50;
  }

  .y-button--warning {
    @apply text-white bg-yellow-600 border-yellow-600 hover:bg-yellow-500 hover:text-white hover:border-yellow-600 active:bg-yellow-600;
  }

  .y-button--warning.is-plain {
    @apply text-yellow-500 bg-yellow-100 border-yellow-300 hover:bg-yellow-500 hover:text-white hover:border-yellow-600 active:bg-yellow-600;
  }

  .y-button--warning.is-link {
    @apply text-yellow-600 bg-transparent border-transparent hover:text-yellow-500 active:text-yellow-600 dark:text-yellow-50;
  }

  .y-button--danger {
    @apply text-white bg-red-600 border-red-600 hover:bg-red-500 hover:text-white hover:border-red-600 active:bg-red-600;
  }

  .y-button--danger.is-plain {
    @apply text-red-500 bg-red-100 border-red-300 hover:bg-red-500 hover:text-white hover:border-red-600 active:bg-red-600;
  }

  .y-button--danger.is-link {
    @apply text-red-600 bg-transparent border-transparent hover:text-red-500 active:text-red-600 dark:text-red-50;
  }

  .y-button--info {
    @apply text-white bg-gray-600 border-gray-600 hover:bg-gray-500 hover:text-white hover:border-gray-600 active:bg-gray-600;
  }

  .y-button--info.is-plain {
    @apply text-gray-500 bg-gray-100 border-gray-300 hover:bg-gray-500 hover:text-white hover:border-gray-600 active:bg-gray-600;
  }

  .y-button--info.is-link {
    @apply text-gray-600 bg-transparent border-transparent hover:text-gray-500 active:text-gray-600 dark:text-gray-50;
  }
}
</style>
