<template>
  <div class="articles-list">
    <template v-if="list && list.length">
      <template v-for="article in list" :key="article.slug">
        <articles-list-item
          :item="article"
          @click-avatar="handleClickAvatar"
          @click-favorite="handleClickFavorite"
          @click-details="handleClickDetails"
        ></articles-list-item>
      </template>
    </template>
    <template v-else>
      <el-empty description="无数据"></el-empty>
    </template>
  </div>
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
  (e: 'clickItemFavorite', data: string): void
  (e: 'clickItemDetails', data: ArticleResult): void
}>()

/** 点击头像 */
const handleClickAvatar = (data: AuthorResult) => {
  emits('clickItemAvatar', data)
}
/** 点击收藏 */
const handleClickFavorite = (data: string) => {
  emits('clickItemFavorite', data)
}
/** 详情 */
const handleClickDetails = (data: ArticleResult) => {
  emits('clickItemDetails', data)
}
</script>

<style lang="scss" scoped>
@import '@/components/articles-list/index.scss';
</style>
