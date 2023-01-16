<template>
  <div class="p-4 flex flex-col shadow-md">
    <div class="py-2 leading-6 text-lg">{{ `${index + 1}、${item.title}` }}</div>
    <div class="leading-5 text-sm text-gray-600">{{ item.describe || '' }}</div>

    <div class="mt-4 flex flex-col space-y-3 text-base">
      <template v-for="(opt, i) in item.answerOptions" :key="opt.value">
        <div
          class="flex items-center text-base rounded border cursor-pointer overflow-hidden border-gray-100 hover:bg-gray-50 hover:border-gray-200"
          :class="optionsClass(opt.value, i)"
          @click="handleOptions(opt.value, i)"
        >
          <span class="px-2 py-1 bg-blue-400 text-white font-bold">{{ opt.value }}</span>
          <span class="px-2 py-1">{{ opt.label }}</span>
        </div>
      </template>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'

import type { PropType } from 'vue'
import type { exercisesParams, selectedAnswerParams } from './types'

const props = defineProps({
  item: {
    type: Object as PropType<exercisesParams>,
    required: true
  },
  answer: {
    type: String,
    default: ''
  },
  index: {
    type: Number,
    default: 1
  }
})
const emits = defineEmits<{
  (e: 'update:answer', value: string): void
  (e: 'select:answer', params: selectedAnswerParams): void
}>()

/** Variable */
let selectIndex = ref(0)

/** Compute */
const optionsClass = computed(() => {
  return (value: string, i: number) => {
    if (!props.answer) return []

    if (selectIndex.value === i) {
      return [props.answer === value && props.item.answer === value ? ' success ' : ' error ']
    } else {
      return [props.item.answer === value ? ' success ' : '']
    }
  }
})

/** Operation */
const handleOptions = (value: string, index: number) => {
  selectIndex.value = index
  emits('update:answer', value)
  emits('select:answer', { exercises: props.item, selectAnswer: value, isSuccess: props.item.answer === value })
}
</script>

<style lang="postcss" scoped>
@tailwind components;

@layer components {
  .success {
    @apply border-green-400 bg-green-100;
  }

  .success span:first-child {
    @apply bg-green-400;
  }

  .error {
    @apply border-red-400 bg-red-100;
  }
  .error span:first-child {
    @apply bg-red-400;
  }
}
</style>
