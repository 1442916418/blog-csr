<template>
  <div class="user">
    <div class="user-header">
      <div class="user-header-avatar">
        <avatar :user="userProfile" direction="column"></avatar>
      </div>
      <div class="user-header-btn">
        <template v-if="user.userName === currentUserName">
          <el-button type="primary" plain @click="router.push('/userSetting')">用户配置</el-button>
        </template>
        <template v-else>
          <el-button type="info" plain :icon="userProfile.following ? Minus : Plus" @click="handleClickFollow">{{
            userProfile.following ? '已关注' : '关 注'
          }}</el-button>
        </template>
      </div>
    </div>
    <div class="user-body">
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
  </div>
</template>

<script lang="ts" setup>
import { onMounted, reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { DEFAULT_TAB } from '@/utils/constant'
import { useAccountStore, Status } from '@/stores/account'

import {
  getArticles,
  getUserProfile,
  followUser,
  deleteFollowUser,
  deleteFavoriteArticles,
  favoriteArticles
} from '@/apis'

import avatar from '@/components/avatar/index.vue'
import articlesListComponent from '@/components/articles-list/index.vue'

import { Plus, Minus } from '@element-plus/icons-vue'
import { ElMessage, type TabsPaneContext } from 'element-plus'
import type { ArticleResult, AuthorResult } from '@/types/response-types'

/** Use of external methods */
const route = useRoute()
const router = useRouter()
const user = useUserStore()
const account = useAccountStore()

/** Variable */
let articlesList = ref<ArticleResult[]>([])
let articlesCountData = ref(0)
let tabName = ref(DEFAULT_TAB.my)
let currentUserName = ref('')

const userProfile = reactive<AuthorResult>({
  username: '',
  bio: '',
  image: '',
  following: false
})
const queryParams = reactive({
  limit: 10,
  offset: 0,
  tag: '',
  author: '',
  favorited: ''
})
const tabs = reactive([
  { label: '我的文章', name: DEFAULT_TAB.my },
  { label: '喜欢的文章', name: DEFAULT_TAB.like }
])

/** Operation */
const init = () => {
  const username = route.params?.username ?? ''

  if (username) {
    const name = username instanceof Array ? username.toString() : username

    currentUserName.value = name
    queryParams.author = name

    getUserProfileData()
    getDefaultArticlesData()
  }
}
const handleIsSignIn = () => {
  if (!user.isUser) {
    account.setStatus(Status.SIGN_IN)
    router.push({ name: 'account' })
    return false
  }

  return true
}
const handleClickFollow = () => {
  if (!currentUserName.value || !handleIsSignIn()) return

  const { following } = userProfile

  if (following) {
    deleteFollowUserData()
  } else {
    followUserData()
  }
}
const handlePagination = (index: number) => {
  queryParams.offset = index === 1 ? 0 : queryParams.limit * (index - 1)
  getDefaultArticlesData()
}
const handlerClickItemAvatar = (data: AuthorResult) => {
  if (data.username && tabName.value === DEFAULT_TAB.like) {
    router.push({
      path: '/user/' + data.username
    })
  }
}
const handlerClickItemFavorite = async (data: ArticleResult) => {
  if (!handleIsSignIn()) return

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

  if (name === DEFAULT_TAB.my) {
    queryParams.author = currentUserName.value
  } else if (name === DEFAULT_TAB.like) {
    queryParams.favorited = currentUserName.value
  }

  getDefaultArticlesData()
}
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
const getUserProfileData = async () => {
  const { data } = await getUserProfile({ username: currentUserName.value })

  if (data?.profile) {
    Object.assign(userProfile, data.profile)
  }
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
const followUserData = async () => {
  const { data } = await followUser({ username: currentUserName.value })

  if (data?.profile) {
    Object.assign(userProfile, data.profile)
    ElMessage.success({ message: '关注成功' })
  }
}
const deleteFollowUserData = async () => {
  const { data } = await deleteFollowUser({ username: currentUserName.value })

  if (data?.profile) {
    Object.assign(userProfile, data.profile)
    ElMessage.success({ message: '取消成功' })
  }
}

/** Lifecycle Hooks */
onMounted(() => {
  init()
})
</script>

<style lang="scss" scoped>
@import '@/views/user/index.scss';
</style>
