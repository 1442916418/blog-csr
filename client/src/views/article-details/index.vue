<template>
  <div class="article-details">
    <div class="article-details-header">
      <div class="article-details-header-title">
        {{ details.title }}
      </div>
      <div class="article-details-header-avatar">
        <avatar-component
          :user="details.author"
          :date="details.createdAt"
          @click="handleClickAvatar"
        ></avatar-component>

        <div class="buts">
          <template v-if="isCurrentUserArticle">
            <el-button size="small" type="primary" :icon="Edit" @click="handleClickEdit">修 改</el-button>
            <el-button size="small" type="danger" :icon="Delete" @click="handleClickDelete">删 除</el-button>
          </template>
          <template v-else>
            <el-button
              size="small"
              type="primary"
              :plain="!details.author.following"
              :icon="Plus"
              @click="handleClickFollow"
              >关 注</el-button
            >
            <el-button size="small" type="primary" :plain="!details.favorited" :icon="Star" @click="handleClickFavorite"
              >收 藏{{ details.favoritesCount || '' }}</el-button
            >
          </template>
        </div>
      </div>
    </div>
    <div class="article-details-body">
      <md-editor v-model="details.body" :previewOnly="true"></md-editor>

      <tags-component :list="details.tagList"></tags-component>

      <el-divider direction="horizontal"></el-divider>

      <div class="article-details-body-comments">
        <box-component>
          <el-input
            v-model="commentBody"
            :autosize="{ minRows: 3, maxRows: 15 }"
            placeholder="请输入个人描述"
            maxlength="300"
            type="textarea"
          />

          <template v-slot:fl>
            <el-icon><Comment /></el-icon>
          </template>
          <template v-slot:fr>
            <el-button type="primary" size="small" @click="handleClickSendComment">提交评论</el-button>
          </template>
        </box-component>

        <template> </template>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, reactive, ref, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { useAccountStore, Status } from '@/stores/account'

import { ElButton, ElDivider, ElIcon, ElInput, ElMessage } from 'element-plus'
import { Star, Plus, Edit, Delete, Comment } from '@element-plus/icons-vue'
import avatarComponent from '@/components/avatar/index.vue'
import tagsComponent from '@/components/tags/index.vue'
import boxComponent from '@/components/box/index.vue'

import { deleteFavoriteArticles, deleteFollowUser, favoriteArticles, followUser, getArticleBySlug } from '@/apis'

import type { ArticleResult, CommentResult } from '@/types/response-types'
import MdEditor from 'md-editor-v3'

/** Use of external methods */
const user = useUserStore()
const router = useRouter()
const route = useRoute()
const account = useAccountStore()

/** Compute */
const isCurrentUserArticle = computed(() => {
  if (!user.userName) return false

  if (!details?.author?.username) return false

  return user.userName === details.author.username
})

/** Variable */
let currentSlug = ref('')
const details = reactive<ArticleResult>({
  slug: '',
  title: '',
  description: '',
  body: '',
  tagList: [],
  createdAt: '',
  updatedAt: '',
  favorited: false,
  favoritesCount: 0,
  author: {
    username: '',
    bio: '',
    image: '',
    following: false
  }
})
const comments = reactive<CommentResult[]>([])
const commentBody = ref('')

/** Operation */
const init = () => {
  const slug = route.params?.slug ?? ''

  currentSlug.value = slug as string

  getArticleDetailsData()
}
const handleIsUser = () => {
  if (!user.isUser) {
    account.setStatus(Status.SIGN_IN)
    router.push({ name: 'account' })
    return false
  }

  return true
}
const handleClickAvatar = () => {
  const username = details?.author?.username ?? ''

  if (username) {
    router.push({ path: '/user/' + username })
  }
}
const handleClickFavorite = async () => {
  if (!handleIsUser()) return

  const { favorited, slug } = details

  if (favorited) {
    const { data } = await deleteFavoriteArticles({ slug })

    if (data?.article) {
      Object.assign(details, data.article)
    }
  } else {
    const { data } = await favoriteArticles({ slug })

    if (data?.article) {
      Object.assign(details, data.article)
    }
  }
}
const handleClickFollow = () => {
  if (!handleIsUser()) return

  const { username, following } = details.author

  if (!username) return

  if (following) {
    deleteFollowUserData(username)
  } else {
    followUserData(username)
  }
}
const handleClickEdit = () => {
  if (details.slug) {
    router.push({ path: '/articles/' + details.slug })
  }
}
const handleClickDelete = () => {}
const handleClickSendComment = () => {}

/** Api */
const getArticleDetailsData = async () => {
  if (!currentSlug.value) return

  const { data } = await getArticleBySlug({ slug: currentSlug.value })

  if (data?.article) {
    Object.assign(details, data.article)
  }
}
const followUserData = async (username: string) => {
  const { data } = await followUser({ username })

  if (data?.profile) {
    Object.assign(details.author, data.profile)
    ElMessage.success({ message: '关注成功' })
  }
}
const deleteFollowUserData = async (username: string) => {
  const { data } = await deleteFollowUser({ username })

  if (data?.profile) {
    Object.assign(details.author, data.profile)
    ElMessage.success({ message: '取消成功' })
  }
}

/** Lifecycle Hooks */
onMounted(() => {
  init()
})
</script>

<style lang="scss" scoped>
@import '@/views/article-details/index.scss';
</style>
