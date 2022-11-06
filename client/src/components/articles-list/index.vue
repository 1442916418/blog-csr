<template>
  <template v-if="list && list.length">
    <template v-for="(article, i) in list" :key="article.slug + i">
      <articles-list-item
        :item="article"
        @click-avatar="handleClickAvatar"
        @click-favorite="handleClickFavorite"
        @click-details="handleClickDetails"
      ></articles-list-item>
    </template>
  </template>
  <template v-else>
    <p class="py-8 text-center">无数据</p>
  </template>
</template>

<script lang="ts" setup>
import articlesListItem from '@/components/articles-list-item/index.vue'

import type { PropType } from 'vue'
import type { ArticleResult, AuthorResult } from '@/types/response-types'

const props = defineProps({
  list: {
    type: Object as PropType<ArticleResult[]>,
    required: true
  }
})

const emits = defineEmits<{
  (e: 'clickItemAvatar', data: AuthorResult): void
  (e: 'clickItemFavorite', data: ArticleResult): void
  (e: 'clickItemDetails', data: ArticleResult): void
}>()

/** 点击头像 */
const handleClickAvatar = (data: AuthorResult) => {
  emits('clickItemAvatar', data)
}
/** 点击收藏 */
const handleClickFavorite = (data: ArticleResult) => {
  emits('clickItemFavorite', data)
}
/** 详情 */
const handleClickDetails = (data: ArticleResult) => {
  emits('clickItemDetails', data)
}
</script>
