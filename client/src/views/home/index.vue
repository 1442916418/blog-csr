<template>
  <div class="home">
    <div class="py-6 text-center text-white bg-blue-600 shadow-inner" v-if="!user.isUser">
      <h1 class="pt-3 text-3xl font-bold"><b>主标题</b></h1>
      <h2>这里是副标题</h2>
    </div>
    <div class="w-full my-5 flex items-start">
      <div class="flex-1">
        <y-tabs v-model="tabName" :list="tabs" @click="handleClickTab"></y-tabs>

        <articles-list-component
          :list="articlesList"
          @click-item-avatar="handlerClickItemAvatar"
          @click-item-favorite="handlerClickItemFavorite"
          @click-item-details="handlerClickItemDetails"
        />

        <y-pagination
          class="my-4 justify-center"
          :total="articlesCountData"
          @current-click="handlePagination"
          @prev-click="handlePagination"
          @next-click="handlePagination"
        />
      </div>
      <div class="p-2 ml-2 w-48 h-auto rounded bg-gray-100">
        <b class="block">标签</b>

        <tags-component :list="tags" type="info" effect="dark" @click="handleClickTag"></tags-component>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, reactive, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { useAccountStore, Status } from '@/stores/account'
import { DEFAULT_TAB } from '@/utils/constant'

import articlesListComponent from '@/components/articles-list/index.vue'
import tagsComponent from '@/components/tags/index.vue'
import yTabs from '@/components/custom/tabs/tabs.vue'
import yPagination from '@/components/custom/pagination/pagination.vue'

import { getArticlesFeed, getArticles, getTags, favoriteArticles, deleteFavoriteArticles } from '@/apis'

import type { ArticleResult, AuthorResult } from '@/types/response-types'

/** Use of external methods */
const user = useUserStore()
const router = useRouter()
const account = useAccountStore()

/** Variable */
let articlesList = ref<ArticleResult[]>([])
let articlesCountData = ref(0)
let tabName = ref('')
let tags = ref<string[]>([])

const queryParams = reactive({
  limit: 10,
  offset: 0,
  tag: '',
  author: '',
  favorited: ''
})
const tabs = reactive<{ label: string; value: string }[]>([])

/** Watch */
watch(
  () => user.isUser,
  () => handleUserArticles(),
  {
    deep: true
  }
)

/** Operation */
const init = () => {
  resetQueryParams()
  resetArticlesData()
  getDefaultArticlesData()

  getAllTagsData()
}
const handleInitDefaultParams = () => {
  tabName.value = DEFAULT_TAB.all
  tabs.push({ label: '全部', value: DEFAULT_TAB.all })
}
const handleClickTag = (tag: string) => {
  const data = handleTabData('#' + tag, tag)
  const len = user.isUser ? 2 : 1

  if (tabs.length === len) {
    tabs.push(data)
  } else {
    tabs[len] = data
  }

  tabName.value = tag

  resetQueryParams()
  resetArticlesData()

  queryParams.tag = tag

  getDefaultArticlesData()
}
const handleUserArticles = () => {
  if (user.isUser) {
    tabs.unshift(handleTabData('我关注的', DEFAULT_TAB.my))
    tabName.value = DEFAULT_TAB.my

    resetQueryParams()
    resetArticlesData()
    getMyFollowArticlesData()
  } else {
    tabs.shift()
    tabName.value = DEFAULT_TAB.all

    init()
  }
}
const handlePagination = (index: number) => {
  queryParams.offset = index === 1 ? 0 : queryParams.limit * (index - 1)
  getDefaultArticlesData()
}
const handlerClickItemAvatar = (data: AuthorResult) => {
  if (data.username) {
    router.push({
      path: '/user/' + data.username
    })
  }
}
const handlerClickItemFavorite = async (data: ArticleResult) => {
  if (!user.isUser) {
    account.setStatus(Status.SIGN_IN)
    router.push({ name: 'account' })
    return
  }

  const { favorited, slug } = data

  if (favorited) {
    const res = await deleteFavoriteArticles({ slug })

    if (res.data?.article) {
      Object.assign(data, res.data.article)
    }
  } else {
    const res = await favoriteArticles({ slug })

    if (res.data?.article) {
      Object.assign(data, res.data.article)
    }
  }
}
const handlerClickItemDetails = (data: ArticleResult) => {
  if (data.slug) {
    router.push({ path: '/articleDetails/' + data.slug })
  }
}
const handleClickTab = (value: string) => {
  tabName.value = value

  resetQueryParams()
  resetArticlesData()

  // 我关注的 tab
  if (value === DEFAULT_TAB.my) {
    getMyFollowArticlesData()
  } else {
    // 排除全部 tab
    if (value !== DEFAULT_TAB.all) {
      Object.assign(queryParams, { tag: value })
    }
    getDefaultArticlesData()
  }
}
const handleTabData = (label: string, name: string) => ({ label, value: name })
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

/** Api */
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

/** Lifecycle Hooks */
onMounted(() => {
  handleInitDefaultParams()

  if (user.isUser) {
    handleUserArticles()
    getAllTagsData()
  } else {
    init()
  }
})
</script>
