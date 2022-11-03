<template>
  <header class="header">
    <div class="flex-1 text-left font-bold" @click="jumpPage('/')">BLOG</div>
    <div class="flex-1 text-right">
      <button class="button-box">Add</button>
      <template v-if="user.isUser">
        <el-button type="info" :icon="Edit" link @click="jumpPage('/articles')">创建新文章</el-button>
        <el-button type="info" :icon="Setting" link @click="jumpPage('/userSetting')">用户配置</el-button>

        <avatar :user="userAvatar" @click="jumpPage('/user/' + user.userName)"></avatar>

        <el-button type="danger" link @click="handleLogout">登 出</el-button>
      </template>
      <template v-else>
        <el-button type="info" :icon="User" link @click="handleAccount(Status.SIGN_IN)">登 录</el-button>
        <el-button type="info" :icon="Plus" link @click="handleAccount(Status.SIGN_UP)">注 册</el-button>
      </template>
    </div>
  </header>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { Status, useAccountStore } from '@/stores/account'

import { ElMessageBox } from 'element-plus'
import { Edit, Setting, User, Plus } from '@element-plus/icons-vue'
import avatar from '@/components/avatar/index.vue'

import type { RouteParamsRaw } from 'vue-router'

/** Use of external methods */
const user = useUserStore()
const account = useAccountStore()
const router = useRouter()
const route = useRoute()

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
  ElMessageBox.confirm('确认退出?', '提示', {
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    type: 'error'
  }).then(() => {
    user.resetUser()
    window.sessionStorage.clear()
    jumpPage('/')
  })
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
    @apply px-4 py-2 h-12 flex justify-center items-center;
  }

  .button-box {
    @apply flex items-center rounded-md text-sm font-medium px-4 py-2;
  }
}
</style>
