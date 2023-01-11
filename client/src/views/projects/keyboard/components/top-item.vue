<template>
  <div class="keyboard-top-item">
    <div v-for="(row, i) in list" :key="i" class="keyboard-row">
      <div v-for="(column, j) in row" :key="column.code + j" :class="columnClass(column.code, column.classNames)">
        <value-component :item="column.value.first" />
        <value-component :item="column.value.last" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, type PropType } from 'vue'

import type { KeysParams } from '../types'
import valueComponent from '../val.vue'

type listType = Array<KeysParams>[]

const props = defineProps({
  list: {
    type: Array as PropType<listType>,
    default: () => [] as listType,
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
</script>

<style lang="postcss" scoped>
@tailwind components;

@layer components {
  .keyboard-top-item {
    display: grid;
    grid-template-columns: auto repeat(3, auto);
    grid-template-rows: 3.5rem;
    justify-content: space-between;
    column-gap: 20px;
  }

  .keyboard-top-item .keyboard-row {
    display: grid;
    grid-template-columns: repeat(4, auto);
    column-gap: 10px;
  }

  .keyboard-top-item .keyboard-row .keyboard-column {
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
