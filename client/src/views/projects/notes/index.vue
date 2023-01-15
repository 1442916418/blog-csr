<template>
  <introduce v-bind="PROJECTS.notes">
    <div class="mx-auto w-3/4 flex flex-col space-y-5">
      <item-component
        v-for="item in list"
        :key="item.id"
        v-bind="item"
        v-model="item.content"
        @add="handleAdd"
        @delete="handleDelete"
      ></item-component>
    </div>
  </introduce>
</template>

<script lang="ts" setup>
import { onMounted, reactive } from 'vue'
import dayjs from 'dayjs'

import introduce from '@/components/introduce/index.vue'
import itemComponent from './item.vue'

import { PROJECTS } from '@/assets/constant'
import { randomUUID } from '@/utils/common'

interface params {
  id: string
  content: string
  datetime: string
}

/** Variable */
let list = reactive<params[]>([])

/** Operation */
const handleAdd = () => list.push({ id: randomUUID(), content: '', datetime: dayjs().format('YYYY-MM-DD HH:mm:ss') })
const handleDelete = (id: string) => (list = list.filter((v) => v.id !== id))

/** Lifecycle Hooks */
onMounted(() => {
  handleAdd()
})
</script>

<style lang="postcss" scoped></style>
