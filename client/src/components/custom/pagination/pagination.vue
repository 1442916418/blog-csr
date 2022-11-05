<template>
  <div :class="[css.b(_b)]" v-show="pageCount">
    <y-button @click="handleClick('prev')">&lt;</y-button>
    <template v-for="page in pageCount" :key="page">
      <y-button @click="handleClickCurrent(page)" :type="page === currentIndex ? 'primary' : 'default'">{{
        page
      }}</y-button>
    </template>
    <y-button @click="handleClick('next')">&gt;</y-button>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'

import yButton from '../button/button.vue'

import * as css from '@/components/custom/utils/css'

let currentIndex = ref<number>(1)

const _b = 'pagination'
const props = defineProps({
  total: Number
})
const emits = defineEmits<{
  (e: 'prevClick', index: number): void
  (e: 'nextClick', index: number): void
  (e: 'currentClick', index: number): void
}>()

const pageCount = computed(() => {
  return props.total ? Math.ceil(props.total / 10) : 0
})

const handleClick = (type: 'prev' | 'next') => {
  let i = currentIndex.value

  if (type === 'prev' && i !== 1) {
    emits('prevClick', --i)
  }
  if (type === 'next' && i < pageCount.value) {
    emits('nextClick', ++i)
  }

  currentIndex.value = i
}
const handleClickCurrent = (i: number) => {
  if (i !== currentIndex.value) {
    currentIndex.value = i
    emits('currentClick', i)
  }
}
</script>

<style lang="postcss" scoped>
@tailwind components;

@layer components {
  .y-pagination {
    @apply flex space-x-2;
  }
}
</style>
