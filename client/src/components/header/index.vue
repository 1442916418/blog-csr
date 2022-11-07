<template>
  <header class="header">
    <div class="flex-1 text-left font-bold cursor-pointer" @click="jumpPage('/')">BLOG</div>
    <div class="flex-1 flex justify-end item-center space-x-2">
      <template v-if="user.isUser">
        <y-button type="info" link @click="jumpPage('/articles')">创建新文章</y-button>
        <y-button type="info" link @click="jumpPage('/userSetting')">用户配置</y-button>

        <avatar :user="userAvatar" @click="jumpPage('/user/' + user.userName)"></avatar>

        <y-button type="danger" link @click="handleLogout">登 出</y-button>
      </template>
      <template v-else>
        <y-button type="info" link @click="handleAccount(Status.SIGN_IN)">登 录</y-button>
        <y-button type="info" link @click="handleAccount(Status.SIGN_UP)">注 册</y-button>
      </template>
    </div>
  </header>

  <Teleport to="body">
    <y-modal :show="showModal" @close="showModal = false" @confirm="handleConfirmLogout">
      <template #body> 确认退出? </template>
    </y-modal>
  </Teleport>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { Status, useAccountStore } from '@/stores/account'

import yModal from '@/components/custom/modal/modal.vue'
import avatar from '@/components/avatar/index.vue'
import yButton from '@/components/custom/button/button.vue'

import type { RouteParamsRaw } from 'vue-router'

/** Use of external methods */
const user = useUserStore()
const account = useAccountStore()
const router = useRouter()
const route = useRoute()

/** Variable */
let showModal = ref(false)

/** Compute */
const userAvatar = computed(() => {
  return {
    username: user.userName,
    image: user.userImage,
    bio: '',
    following: false
  }
})

/** Operation */
const handleLogout = () => {
  showModal.value = true
}
const handleConfirmLogout = () => {
  showModal.value = false

  user.resetUser()
  window.sessionStorage.clear()
  jumpPage('/')
}
const handleAccount = (status: Status) => {
  account.setStatus(status)

  if (route.path !== '/account') {
    jumpPage('/account')
  }
}
const jumpPage = (path: string, params?: RouteParamsRaw) => {
  router.push({ path, params: params || {} })
}
</script>

<style scoped>
@tailwind components;

@layer components {
  .header {
    @apply px-4 py-3 h-12 flex justify-center items-center;
  }
}
</style>
