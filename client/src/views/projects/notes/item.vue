<template>
  <div class="rounded shadow flex flex-col">
    <div class="p-2 flex justify-between items-center bg-gray-100">
      <span>{{ datetime }}</span>
      <span class="space-x-4">
        <i class="iconfont icon-delete cursor-pointer hover:font-bold" @click="emits('delete', id)"></i>
        <i class="iconfont icon-add cursor-pointer hover:font-bold" @click="emits('add')"></i>
      </span>
    </div>

    <div class="grid grid-cols-2">
      <textarea class="w-full h-40 p-2 overflow-y-auto" @input="changeContent"></textarea>

      <div class="markdown-preview p-2 overflow-y-auto border-l border-gray-100" v-text="html"></div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

import Markdown from '@/utils/markdown'

defineProps({
  content: {
    type: String,
    required: true
  },
  datetime: {
    type: String,
    default: ''
  },
  id: {
    type: String
  }
})
const emits = defineEmits(['update:content', 'add', 'delete'])

/** Variable */
let html = ref('')
const markdown = new Markdown()

/** Operation */
const changeContent = (e: Event) => {
  const value = (e.target as HTMLTextAreaElement).value

  html.value = markdown.makeHtml(value)

  window.localStorage.setItem('value', JSON.stringify(value))

  emits('update:content', value)
}
</script>

<style scoped>
textarea {
  border: none;
  outline: none;
  resize: none;
}
textarea:focus {
  border: none;
  box-shadow: none;
}
</style>
