<template>
  <div class="header-container">
    <div class="header-container-left" @click="jumpPage('main')">BLOG</div>
    <div class="header-container-right">
      <template v-if="user.isUser">
        <el-button type="info" :icon="Edit" link @click="jumpPage('articles')">创建新文章</el-button>
        <el-button type="info" :icon="Setting" link>用户配置</el-button>

        <avatar :user="userAvatar"></avatar>

        <el-button type="danger" link @click="handleLogout">登 出</el-button>
      </template>
      <template v-else>
        <el-button type="info" :icon="User" link @click="handleAccount(Status.SIGN_IN)">登 录</el-button>
        <el-button type="info" :icon="Plus" link @click="handleAccount(Status.SIGN_UP)">注 册</el-button>
      </template>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { Edit, Setting, User, Plus } from '@element-plus/icons-vue'
import { Status, useAccountStore } from '@/stores/account'

import avatar from '@/components/avatar/index.vue'

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
  user.resetUser()
  window.sessionStorage.clear()
  jumpPage('main')
}
const handleAccount = (status: Status) => {
  account.setStatus(status)

  if (route.path !== 'account') {
    jumpPage('account')
  }
}
const jumpPage = (name: string) => router.push({ name })
</script>

<style lang="scss" scoped>
.header-container {
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;

  &-left {
    font-size: 20px;
    font-weight: bold;
    cursor: pointer;
  }

  &-right {
    display: flex;
  }
}
</style>
