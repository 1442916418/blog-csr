<template>
  <introduce v-bind="PROJECTS.flip">
    <div class="mx-auto w-80 flex flex-col space-y-4">
      <flip-container v-for="item in list" :key="item.id" :type="item.type">
        <template #front>
          <img :src="item.url[0]" alt="front" :title="item.title" style="width: 100%; height: 100%" />
        </template>

        <template #back>
          <img :src="item.url[1]" alt="back" :title="item.title" style="width: 100%; height: 100%" />
        </template>
      </flip-container>
    </div>
  </introduce>
</template>

<script lang="ts" setup>
import introduce from '@/components/introduce/index.vue'
import flipContainer from './container.vue'

import { PROJECTS } from '@/utils/constant'

/** Variable */
const list = [
  {
    id: 'k1',
    title: '水平翻转',
    url: [
      'https://kjimg10.360buyimg.com/ott/jfs/t1/99453/22/36265/134406/63bb7bafF3bea0392/9612c2fc34474fab.jpg',
      'https://kjimg10.360buyimg.com/ott/jfs/t1/160561/36/34080/364076/63bb7bc3F228b6791/deab3463d4e85898.jpg'
    ],
    type: 'horizontal'
  },
  {
    id: 'k2',
    title: '垂直翻转',
    url: [
      'https://kjimg10.360buyimg.com/ott/jfs/t1/6114/38/25656/103005/63bb7bdaF5bb505ce/70ed4ea294206398.jpg',
      'https://kjimg10.360buyimg.com/ott/jfs/t1/221642/40/17567/138261/63bb7dbcF8e36aca9/03c1c976e09f432f.jpg'
    ],
    type: 'vertical'
  }
]
</script>
