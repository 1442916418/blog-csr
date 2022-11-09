<template>
  <div :class="[css.b(_b)]">
    <template v-for="tab in list" :key="tab.value">
      <div
        :class="[css.be(_b, 'tab'), css.is('active', value ? value === tab.value : false)]"
        @click="handleClickTag(tab.value)"
      >
        {{ tab.label }}
      </div>
    </template>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'

import type { PropType } from 'vue'
import type { ITabItem } from './tabs'

import * as css from '@/components/custom/utils/css'

const _b = 'tabs'
const props = defineProps({
  list: {
    type: Array as PropType<ITabItem[]>
  },
  modelValue: String as PropType<string>
})
const emits = defineEmits<{
  (e: 'update:modelValue', value: string): void
  (e: 'click', value: string): void
}>()

const value = computed(() => props.modelValue)

const handleClickTag = (value: string) => {
  emits('update:modelValue', value)
  emits('click', value)
}
</script>

<style lang="postcss" scoped>
@tailwind components;

@layer components {
  .y-tabs {
    @apply flex space-x-2;
  }

  .y-tabs__tab {
    @apply px-3 py-2 bg-white text-gray-600 cursor-pointer hover:text-blue-600;
  }
  .y-tabs__tab.is-active {
    @apply text-blue-600 font-bold;
  }
}
</style>
