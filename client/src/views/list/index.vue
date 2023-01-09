<template>
  <div class="m-10 flex">
    <div class="mr-5 w-56 flex flex-col">
      <span
        v-for="item in projects"
        :key="item.url"
        class="px-4 py-2 mb-2 text-blue-600 bg-blue-50 hover:text-blue-400 hover:bg-blue-100 rounded-md cursor-pointer"
        :class="[active === item.id ? 'bg-blue-50' : '']"
        @click="handleUrl(item.id)"
        >{{ item.title }}</span
      >
    </div>

    <iframe :src="url" class="w-full h-screen"></iframe>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'

import { PROJECTS, CSS_PROJECTS } from '@/assets/constant'

/** Variable */
let url = ref('')
let active = ref('')

const projects = { ...PROJECTS, ...CSS_PROJECTS }

/** Compute */
const handleUrl = (id: string) => {
  active.value = id
  url.value = `https://www.yss.world/articleDetails/${id}`
}

onMounted(() => {
  const first = PROJECTS.decimalConversion.id

  active.value = first
  handleUrl(first)
})
</script>
