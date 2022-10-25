<template>
  <div class="home">
    <div class="home-header" v-if="!user.isUser">
      <h1><b>主标题</b></h1>
      <h2>这里是副标题</h2>
    </div>
    <div class="home-body">
      <div class="home-body-left">
        <el-tabs v-model="tabName" @tab-click="handleClick">
          <template v-for="item in tabs" :key="item.name">
            <el-tab-pane :label="item.label" :name="item.name">
              <articles-list-component :list="articlesList" />
            </el-tab-pane>
          </template>
        </el-tabs>
      </div>
      <div class="home-body-right">
        <b>标签</b>

        <div class="tags">
          <template v-for="tag in tags" :key="tag">
            <el-tag class="tag" type="info" size="small" effect="dark" round>{{ tag }}</el-tag>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted, watch } from 'vue'
import { useUserStore } from '@/stores/user'
import { DEFAULT_TAB } from '@/utils/constant'

import { getArticlesFeed, getArticles, getTags } from '@/apis'
import articlesListComponent from '@/components/articles-list/index.vue'

import type { ArticleResult } from '@/types/response-types'
import type { TabsPaneContext } from 'element-plus'

const user = useUserStore()

let articlesList = ref<ArticleResult[]>([])
let articlesCountData = ref(0)
let tabName = ref(DEFAULT_TAB.all)
let tags = ref<string[]>([])

const queryParams = reactive({
  limit: 10,
  offset: 0,
  tag: '',
  author: '',
  favorited: ''
})
const tabs = reactive([{ label: '全部', name: DEFAULT_TAB.all }])

watch(
  () => user.isUser,
  () => handleUserArticles()
)

const handleClick = (tab: TabsPaneContext, event: Event) => {
  console.log('🚀 ~ file: index.vue ~ line 30 ~ handleClick', tab, event)
}

const handleTabData = (label: string, name: string) => ({ label, name })
const resetQueryParams = () => {
  Object.assign(queryParams, {
    limit: 10,
    offset: 0,
    tag: '',
    author: '',
    favorited: ''
  })
}
const resetArticlesData = () => {
  articlesList.value.length = 0
  articlesCountData.value = 0
}

const getMyFollowArticlesData = async () => {
  const {
    data: { articles, articlesCount }
  } = await getArticlesFeed(queryParams)

  if (articles?.length) {
    articlesList.value = queryParams.offset ? [...articlesList.value, ...articles] : articles
  } else {
    articlesList.value.length = 0
  }

  articlesCountData.value = articlesCount || 0
}

const getDefaultArticlesData = async () => {
  const {
    data: { articles, articlesCount }
  } = await getArticles(queryParams)

  if (articles?.length) {
    articlesList.value = queryParams.offset ? [...articlesList.value, ...articles] : articles
  } else {
    articlesList.value.length = 0
  }

  articlesCountData.value = articlesCount || 0
}

const getAllTagsData = async () => {
  const { data } = await getTags()

  tags.value = data.tags
}

const handleUserArticles = () => {
  if (user.isUser) {
    tabs.unshift(handleTabData('我的', DEFAULT_TAB.my))
    tabName.value = DEFAULT_TAB.my

    resetQueryParams()
    resetArticlesData()
    getMyFollowArticlesData()
  } else {
    const findAllTabIndex = tabs.findIndex((t) => t.name === DEFAULT_TAB.all)

    if (!findAllTabIndex) {
      tabs.shift()
      tabName.value = DEFAULT_TAB.all

      init()
    }
  }
}

const init = () => {
  resetQueryParams()
  resetArticlesData()
  getDefaultArticlesData()

  getAllTagsData()
}

onMounted(() => {
  init()
})
</script>

<style lang="scss" scoped>
@import '@/views/home/index.scss';
</style>
