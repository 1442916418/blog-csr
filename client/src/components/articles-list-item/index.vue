<template>
  <div class="articles-list-item">
    <el-descriptions :column="1" size="large" @click="emits('clickDetails', item)">
      <template #title>
        <avatar :user="item.author" :date="item.createdAt" @click="emits('clickAvatar', item.author)"></avatar>
      </template>
      <template #extra>
        <el-button
          size="small"
          type="primary"
          :plain="!item.favorited"
          :icon="Star"
          @click.stop="emits('clickFavorite', item)"
          >{{ item.favoritesCount || '' }}</el-button
        >
      </template>

      <el-descriptions-item>
        <b>{{ item.title }}</b>
      </el-descriptions-item>
      <el-descriptions-item>
        {{ item.description }}
      </el-descriptions-item>
      <el-descriptions-item align="right">
        <template v-for="tag in item.tagList" :key="tag">
          <el-tag size="small" effect="plain" round class="tag">{{ tag }}</el-tag>
        </template>
      </el-descriptions-item>
    </el-descriptions>

    <el-divider />
  </div>
</template>

<script lang="ts" setup>
import { Star } from '@element-plus/icons-vue'

import avatar from '@/components/avatar/index.vue'

import type { PropType } from 'vue'
import type { ArticleResult, AuthorResult } from '@/types/response-types'

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

<style lang="scss" scoped>
@import '@/components/articles-list-item/index.scss';
</style>
