<template>
  <div class="p-5 flex flex-col items-start bg-gray-400">
    <div class="text-white text-2xl font-bold mb-2">
      {{ details.title }}
    </div>
    <div class="py-4 flex items-center">
      <avatar-component :user="details.author" :date="details.createdAt" @click="handleClickAvatar" />

      <div class="ml-5 space-x-2">
        <template v-if="isCurrentUserArticle">
          <y-button size="small" type="primary" @click="handleClickEdit">修 改</y-button>
          <y-button size="small" type="danger" @click="handleClickDelete">删 除</y-button>
        </template>
        <template v-else>
          <y-button size="small" type="primary" :plain="!details.author.following" @click="handleClickFollow"
            >关 注
          </y-button>
          <y-button size="small" type="primary" :plain="!details.favorited" @click="handleClickFavorite">
            收 藏{{ details.favoritesCount || '' }}</y-button
          >
        </template>
      </div>
    </div>
  </div>
  <div class="my-5">
    <div class="mb-2">
      <span class="text-sm text-gray-500">描述</span><br />

      <div class="text-gray-400">{{ details.description }}</div>
    </div>

    <md-editor v-model="details.body" :previewOnly="true"></md-editor>

    <tags-component :list="details.tagList"></tags-component>

    <div class="my-5 border-b-2 border-gray-200"></div>

    <div class="mx-auto w-3/5">
      <box-component class="mb-5">
        <textarea
          class="w-full border-none"
          name="commentBody"
          id="commentBody"
          cols="30"
          rows="5"
          placeholder="请输入评论内容"
          v-model="commentBody"
        ></textarea>

        <template v-slot:fl> 评论 </template>
        <template v-slot:fr>
          <y-button type="primary" size="small" @click="handleClickSendComment">提交评论</y-button>
        </template>
      </box-component>

      <template v-for="(comment, i) in comments" :key="comment.id">
        <box-component class="mb-5">
          <div class="p-3">
            {{ comment.body }}
          </div>

          <template v-slot:fl>
            <avatar-component :user="comment.author" :date="comment.createdAt" @click="handleClickAvatar" />
          </template>
          <template v-slot:fr>
            <y-button v-if="isCurrentUserArticle" size="small" @click="handleClickDeleteComment(comment.id, i)"
              >删除</y-button
            >
          </template>
        </box-component>
      </template>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, reactive, ref, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { useAccountStore, Status } from '@/stores/account'

import { ElMessage, ElMessageBox } from 'element-plus'
import avatarComponent from '@/components/avatar/index.vue'
import tagsComponent from '@/components/tags/index.vue'
import boxComponent from '@/components/box/index.vue'
import yButton from '@/components/custom/button/button.vue'

import {
  deleteFavoriteArticles,
  deleteFollowUser,
  favoriteArticles,
  followUser,
  getArticleBySlug,
  deleteArticleBySlug,
  createComment,
  deleteComment,
  getComments
} from '@/apis'

import type { ArticleResult, CommentResult, UserResult } from '@/types/response-types'

// TODO: 导入报错
// import { StatusCodes } from 'http-status-codes'

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
  getCommentsData()
}
const handleIsSignIn = () => {
  if (!user.isUser) {
    account.setStatus(Status.SIGN_IN)
    router.push({ name: 'account' })
    return false
  }

  return true
}
const handleClickAvatar = (user: UserResult) => {
  const username = user?.username ?? ''

  if (username) {
    router.push({ path: '/user/' + username })
  }
}
const handleClickFavorite = async () => {
  if (!handleIsSignIn()) return

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
  if (!handleIsSignIn()) return

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
const handleClickDelete = () => {
  if (!details.slug) return

  ElMessageBox.confirm('确定删除此文章吗?', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'error'
  }).then(() => {
    deleteArticleBySlugData(details.slug)
  })
}
const handleClickSendComment = async () => {
  if (!handleIsSignIn() || !details.slug) return

  if (!commentBody.value) {
    ElMessage.warning({ message: '请输入评论内容' })
    return
  }

  const { data } = await createComment({ slug: details.slug }, { comment: { body: commentBody.value } })

  if (data.comment) {
    ElMessage.success('评论成功')

    commentBody.value = ''
    comments.unshift(data.comment)
  }
}
const handleClickDeleteComment = async (id: number, index: number) => {
  if (!details.slug || !id) return

  const { data } = await deleteComment({ slug: details.slug, id })

  if (data.result === 200) {
    ElMessage.success('删除成功')

    comments.splice(index, 1)
  }
}

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
const deleteArticleBySlugData = async (slug: string) => {
  const { data } = await deleteArticleBySlug({ slug })

  if (data.result === 200) {
    ElMessage.success({ message: '删除成功' })

    router.push({ path: '/' })
  }
}
const getCommentsData = async () => {
  if (!currentSlug.value) return

  const { data } = await getComments({ slug: currentSlug.value })

  if (data.comments) {
    comments.push(...data.comments)
  }
}

/** Lifecycle Hooks */
onMounted(() => {
  init()
})
</script>
