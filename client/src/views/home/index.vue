<template>
  <div class="home">
    <div class="home-header" v-if="!user.isUser">
      <h1><b>主标题</b></h1>
      <h2>这里是副标题</h2>
    </div>
    <div class="home-body">
      <div class="home-body-left">
        <el-tabs v-model="tabName" @tab-click="handleClickTab">
          <template v-for="item in tabs" :key="item.name">
            <el-tab-pane :label="item.label" :name="item.name">
              <articles-list-component
                :list="articlesList"
                @click-item-avatar="handlerClickItemAvatar"
                @click-item-favorite="handlerClickItemFavorite"
                @click-item-details="handlerClickItemDetails"
              />
            </el-tab-pane>
          </template>
        </el-tabs>

        <el-pagination
          background
          hide-on-single-page
          layout="prev, pager, next"
          :total="articlesCountData"
          @current-change="handlePagination"
          @prev-click="handlePagination"
          @next-click="handlePagination"
        />
      </div>
      <div class="home-body-right">
        <b>标签</b>

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

import { getArticlesFeed, getArticles, getTags, favoriteArticles, deleteFavoriteArticles } from '@/apis'

import type { ArticleResult, AuthorResult } from '@/types/response-types'
import type { TabsPaneContext } from 'element-plus'

/** Use of external methods */
const user = useUserStore()
const router = useRouter()
const account = useAccountStore()

/** Variable */
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
// TODO: 收藏，接口错误
const handlerClickItemFavorite = async (data: ArticleResult) => {
  if (!user.isUser) {
    account.setStatus(Status.SIGN_IN)
    router.push({ name: 'account' })
    return
  }

  console.log('🚀 ~ file: index.vue ~ line 100 ~ handlerClickItemFavorite ~ data', data)

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
const handleClickTab = (tab: TabsPaneContext) => {
  const { name } = tab.props

  resetQueryParams()
  resetArticlesData()

  // 我关注的 tab
  if (name === DEFAULT_TAB.my) {
    getMyFollowArticlesData()
  } else {
    // 排除全部 tab
    if (name !== DEFAULT_TAB.all) {
      Object.assign(queryParams, { tag: name })
    }
    getDefaultArticlesData()
  }
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
  if (user.isUser) {
    handleUserArticles()
    getAllTagsData()
  } else {
    init()
  }
})
</script>

<style lang="scss" scoped>
@import '@/views/home/index.scss';
</style>
