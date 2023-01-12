<template>
  <introduce v-bind="PROJECTS.notes">
    <div class="mx-auto w-3/4 flex justify-center"></div>
  </introduce>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'

import introduce from '@/components/introduce/index.vue'

import { PROJECTS } from '@/assets/constant'

interface params {
  content: ''
  datetime: ''
}

/** Variable */
const list = reactive<params[]>([])
</script>

<style lang="postcss" scoped></style>
