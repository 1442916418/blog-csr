<template>
  <div class="inline-block space-x-2 space-y-2">
    <template v-for="tag in list" :key="tag">
      <y-button :type="type" :size="size" round class="tag" @click="emits('click', tag)">{{ tag }}</y-button>
    </template>
  </div>
</template>

<script lang="ts" setup>
import yButton from '@/components/custom/button/button.vue'

import type { PropType } from 'vue'

const props = defineProps({
  list: {
    type: Array as PropType<string[]>,
    required: true
  },
  type: {
    type: String,
    default: 'default'
  },
  size: {
    type: String,
    default: 'small'
  }
})

const emits = defineEmits<{
  (e: 'click', data: string): void
}>()
</script>
