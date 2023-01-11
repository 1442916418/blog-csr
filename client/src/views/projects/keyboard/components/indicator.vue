<template>
  <div class="grid grid-cols-3 gap-6 text-xs text-gray-400">
    <div class="grid justify-center" v-for="item in list" :key="item.code">
      <span class="mx-auto w-3 h-5 rounded-sm bg-gray-50" :class="itemClass(item.code)"></span>
      <span v-text="item.key"></span>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'

const props = defineProps({
  actives: {
    type: Array,
    default: () => [],
    required: true
  }
})

/** Variable */
const list = [
  {
    code: 'NumLock',
    key: 'NumLock',
    keyCode: 144
  },
  {
    code: 'CapsLock',
    key: 'CapsLock',
    keyCode: 20
  },
  {
    code: 'ScrollLock',
    key: 'ScrollLock',
    keyCode: 145
  }
]

/** Compute */
const itemClass = computed(() => {
  return (code: string) => {
    const isActive = props.actives && props.actives.includes(code)
    return [isActive ? ' item-active ' : '']
  }
})
</script>

<style lang="postcss" scoped>
@tailwind components;

@layer components {
  .item-active {
    @apply bg-gray-200;
  }
}
</style>
