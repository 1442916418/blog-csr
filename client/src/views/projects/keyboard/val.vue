<template>
  <span v-show="item" v-html="item?.label" :class="item?.classNames"></span>
</template>

<script lang="ts" setup>
import type { keysValueParams } from './types'
import type { PropType } from 'vue'

defineProps({
  item: {
    type: Object as PropType<keysValueParams | undefined>
  }
})
</script>
