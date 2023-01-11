<template>
  <div class="keyboard-item" :style="itemStyles">
    <div v-for="(row, i) in list" :key="i" class="keyboard-row">
      <div v-for="column in row" :key="column.code" :class="columnClass(column.code, column.classNames)">
        <value-component :item="column.value.first" />
        <value-component :item="column.value.last" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, type PropType } from 'vue'

import type { KeysParams } from './types'
import valueComponent from './val.vue'

const props = defineProps({
  list: {
    type: Array as PropType<Array<KeysParams[]>>,
    default: () => [] as KeysParams[],
    required: true
  },
  actives: {
    type: Array,
    default: () => [],
    required: true
  }
})

/** Compute */
const columnClass = computed(() => {
  return (code: string, classNames: string) => {
    const isActive = props.actives && props.actives.includes(code)
    return ['keyboard-column', classNames, isActive ? ' keyboard-column-active ' : '']
  }
})
const itemStyles = computed(() => {
  const list = props.list
  const columns = list && list.length ? Math.max(...list.map((v) => v.length)) : 0

  return { '--columns': columns }
})
</script>

<style lang="postcss" scoped>
@tailwind components;

@layer components {
  .keyboard-item {
    @apply space-y-4;
  }

  .keyboard-row {
    display: grid;
    grid-template-columns: repeat(var(--columns), auto);
    grid-template-rows: 3.5rem;
    justify-content: space-between;
    column-gap: 10px;
  }

  .keyboard-row .keyboard-column {
    @apply grid text-gray-400 text-base;
    padding: 2px 8px;
    border-radius: 4px;
    word-break: break-all;
    background: linear-gradient(145deg, #ced0d4, #f5f7fb);
    box-shadow: 5px 5px 9px #dcdee2, -5px -5px 9px #eef0f4;
  }
}

.keyboard-column-active {
  background: #e5e7eb !important;
  box-shadow: inset 5px 5px 9px #dcdee2, inset -5px -5px 9px #eef0f4 !important;
}
</style>
