<template>
  <div
    class="px-4 flex flex-col border-b-2 border-gray-200 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700"
    @click="emits('clickDetails', item)"
  >
    <div class="py-1 md:py-1 lg:py-4 xl:py-4 2xl:py-4 flex justify-between items-center" v-if="env.isDev">
      <avatar :user="item.author" :date="item.createdAt" @click="emits('clickAvatar', item.author)"></avatar>

      <y-button size="small" type="primary" :plain="!item.favorited" @click.stop="emits('clickFavorite', item)">
        <i class="iconfont icon-favorite" :style="{ 'margin-right': item.favoritesCount ? '4px' : 0 }"></i
        >{{ item.favoritesCount || '' }}
      </y-button>
    </div>

    <div class="py-1 md:py-1 lg:py-4 xl:py-4 2xl:py-4 text-base font-bold">{{ item.title }}</div>

    <div class="py-2 md:py-2 lg:py-4 xl:py-4 2xl:py-4 text-sm line-clamp-3 text-gray-500 dark:text-gray-200">
      {{ item.description }}
    </div>

    <div class="py-2 md:py-2 lg:py-4 xl:py-4 2xl:py-4 text-right">
      <tags :list="item.tagList"></tags>
    </div>
  </div>
</template>

<script lang="ts" setup>
import avatar from '@/components/avatar/index.vue'
import tags from '@/components/tags/index.vue'
import yButton from '@/components/custom/button/button.vue'
import { useEnvStore } from '@/stores/env'

import type { PropType } from 'vue'
import type { ArticleResult, AuthorResult } from '@/types/response-types'

const env = useEnvStore()

const props = defineProps({
  item: {
    type: Object as PropType<ArticleResult>,
    required: true
  }
})

const emits = defineEmits<{
  (e: 'clickAvatar', data: AuthorResult): void
  (e: 'clickFavorite', data: ArticleResult): void
  (e: 'clickDetails', data: ArticleResult): void
}>()
</script>
