<template>
  <div class="tags">
    <template v-for="tag in list" :key="tag">
      <el-tag v-bind="elTagProps" round class="tag" @click="emits('click', tag)">{{ tag }}</el-tag>
    </template>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { tagProps } from 'element-plus'

import type { PropType } from 'vue'

const props = defineProps({
  list: {
    type: Array as PropType<string[]>,
    required: true
  },
  ...tagProps
})

const emits = defineEmits<{
  (e: 'click', data: string): void
}>()

const isUndefined = (v: any) => typeof v === 'undefined'

const elTagProps = computed(() => {
  const { closable, type, disableTransitions, hit, color, size, effect, round } = props

  return Object.assign(
    {},
    {
      closable: isUndefined(closable) ? false : closable,
      type: isUndefined(type) ? 'info' : type,
      hit: isUndefined(hit) ? false : hit,
      color: isUndefined(color) ? '#ffffff' : color,
      size: isUndefined(size) ? 'small' : size,
      effect: isUndefined(effect) ? 'plain' : effect,
      round: isUndefined(round) ? true : round,
      disableTransitions: isUndefined(disableTransitions) ? false : disableTransitions
    }
  )
})
</script>

<style lang="scss" scoped>
.tags {
  display: inline-block;

  .tag {
    margin-right: 6px;
    margin-bottom: 6px;
    cursor: pointer;

    &:last-child {
      margin-right: 0;
      margin-bottom: 0;
    }
  }
}
</style>
