<template>
  <div class="p-5 flex flex-col items-start bg-gray-400 dark:bg-gray-600">
    <div class="text-white text-2xl font-bold mb-2">
      {{ details.title }}
    </div>
    <div class="py-4 flex flex-col items-center md:flex-row lg:flex-row xl:flex-row 2xl:flex-row">
      <avatar-component :user="details.author" :date="details.createdAt" @click="handleClickAvatar" />

      <div class="ml-5 flex space-x-2">
        <template v-if="isCurrentUserArticle">
          <span class="hidden md:hidden lg:inline xl:inline 2xl:inline">
            <y-button size="small" type="primary" @click="handleClickEdit"
              ><i class="iconfont icon-edit"></i> 修 改</y-button
            >
          </span>
          <y-button size="small" type="danger" @click="handleClickDelete"
            ><i class="iconfont icon-delete"></i> 删 除</y-button
          >
        </template>
        <template v-else>
          <y-button size="small" type="primary" :plain="!details.author.following" @click="handleClickFollow">
            <i class="iconfont icon-add"></i>
            关 注
          </y-button>
          <y-button size="small" type="primary" :plain="!details.favorited" @click="handleClickFavorite">
            <i class="iconfont icon-favorite"></i>
            收 藏{{ details.favoritesCount || '' }}</y-button
          >
        </template>
      </div>
    </div>
  </div>

  <div class="m-5">
    <div class="mb-2">
      <span class="text-sm text-gray-500"> <i class="iconfont icon-text"></i> 描述 </span><br />

      <div class="text-gray-400">{{ details.description }}</div>
    </div>

    <md-editor
      v-model="details.body"
      :previewOnly="true"
      :theme="theme.isDark ? 'dark' : 'light'"
      :style="
        theme.isDark
          ? {
              '--md-bk-color': 'bg-gray-600',
              '--md-bk-color-outstand': 'bg-gray-400'
            }
          : {}
      "
    ></md-editor>

    <tags-component class="mt-4" :list="details.tagList"></tags-component>

    <div class="my-5 border-b-2 border-gray-200"></div>

    <div class="mx-auto w-11/12 md:w-11/12 lg:w-3/5 xl:w-3/5 2xl:w-3/5">
      <box-component class="mb-5">
        <textarea
          class="w-full border-none"
          name="commentBody"
          id="commentBody"
          cols="30"
          rows="2"
          placeholder="请输入评论内容"
          v-model="commentBody"
        ></textarea>

        <template v-slot:fl>
          <i class="iconfont icon-comments"></i>
          评论
        </template>
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
            <i
              v-if="isCurrentUserArticle"
              class="iconfont icon-delete"
              @click="handleClickDeleteComment(comment.id, i)"
            ></i>
          </template>
        </box-component>
      </template>
    </div>
  </div>

  <Teleport to="body">
    <y-modal :show="showModal" @close="showModal = false" @confirm="handleClickDeleteConfirm">
      <template #body> 确定删除此文章吗? </template>
    </y-modal>
  </Teleport>
</template>

<script lang="ts" setup>
import { onMounted, reactive, ref, computed, nextTick } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { useAccountStore, Status } from '@/stores/account'
import { useThemeStore } from '@/stores/theme'
import { useSkeletonStore } from '@/stores/skeleton'

import { Message } from '@/components/custom/message/message'

import avatarComponent from '@/components/avatar/index.vue'
import tagsComponent from '@/components/tags/index.vue'
import boxComponent from '@/components/box/index.vue'
import yButton from '@/components/custom/button/button.vue'
import yModal from '@/components/custom/modal/modal.vue'

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

import type { ArticleResult, AuthorResult, CommentResult } from '@/types/response-types'

// TODO: 导入报错
// import { StatusCodes } from 'http-status-codes'

/** Use of external methods */
const user = useUserStore()
const router = useRouter()
const route = useRoute()
const account = useAccountStore()
const theme = useThemeStore()
const skeleton = useSkeletonStore()

/** Variable */
let showModal = ref(false)
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

/** Compute */
const isCurrentUserArticle = computed(() => {
  if (!user.userName) return false

  if (!details?.author?.username) return false

  return user.userName === details.author.username
})

/** Operation */
const init = () => {
  skeleton.setLoading(true)

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
const handleClickAvatar = (user: AuthorResult) => {
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

  showModal.value = true
}
const handleClickDeleteConfirm = () => {
  deleteArticleBySlugData(details.slug)
}
const handleClickSendComment = async () => {
  if (!handleIsSignIn() || !details.slug) return

  if (!commentBody.value) {
    Message.warning('请输入评论内容')
    return
  }

  const { data } = await createComment({ slug: details.slug }, { comment: { body: commentBody.value } })

  if (data.comment) {
    Message.success('评论成功')

    commentBody.value = ''
    comments.unshift(data.comment)
  }
}
const handleClickDeleteComment = async (id: number, index: number) => {
  if (!details.slug || !id) return

  const { data } = await deleteComment({ slug: details.slug, id })

  if (data.result === 200) {
    Message.success('删除成功')

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

  nextTick(() => {
    skeleton.loading && skeleton.setLoading(false)
  })
}
const followUserData = async (username: string) => {
  const { data } = await followUser({ username })

  if (data?.profile) {
    Object.assign(details.author, data.profile)
    Message.success('关注成功')
  }
}
const deleteFollowUserData = async (username: string) => {
  const { data } = await deleteFollowUser({ username })

  if (data?.profile) {
    Object.assign(details.author, data.profile)
    Message.success('取消成功')
  }
}
const deleteArticleBySlugData = async (slug: string) => {
  const { data } = await deleteArticleBySlug({ slug })

  if (data.result === 200) {
    showModal.value = false
    Message.success('删除成功')

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
