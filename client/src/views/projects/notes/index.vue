<template>
  <introduce v-bind="PROJECTS.notes">
    <div class="mx-auto w-3/4 flex flex-col space-y-5">
      <div class="w-4 h-4 bg-gray-400 mb-10" @click="test"></div>
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

import Markdown from '@/utils/markdown'

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
const test = () => {
  const md = new Markdown()
  const v = window.localStorage.getItem('value') || ''

  const html = md.makeHtml(v)
  console.log('🚀 ~ file: index.vue:46 ~ test ~ html', html)
}

/** Lifecycle Hooks */
onMounted(() => {
  handleAdd()
})
</script>

<style lang="postcss" scoped></style>
