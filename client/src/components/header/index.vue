<template>
  <div class="header-container">
    <div class="header-container-left" @click="handleHome">BLOG</div>
    <div class="header-container-right">
      <template v-if="isUser">
        <el-button type="info" :icon="Edit" link>创建新文章</el-button>
        <el-button type="info" :icon="Setting" link>用户配置</el-button>

        <span>
          <el-avatar :icon="User" :src="userImage" />
          <el-button type="info" link>{{ userName }}</el-button>
        </span>
      </template>
      <template v-else>
        <el-button type="info" :icon="User" link @click="handleAccount(Status.SIGN_IN)">登 录</el-button>
        <el-button type="info" :icon="Plus" link @click="handleAccount(Status.SIGN_UP)">注 册</el-button>
      </template>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useRouter, useRoute } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { Edit, Setting, User, Plus } from '@element-plus/icons-vue'
import { Status, useAccountStore } from '@/stores/account'

const { isUser, userName, userImage } = useUserStore()
const account = useAccountStore()
const router = useRouter()
const route = useRoute()

const handleAccount = (status: Status) => {
  account.setStatus(status)

  if (route.path !== '/account') {
    router.push({ path: '/account' })
  }
}

const handleHome = () => router.push({ path: '/' })
</script>

<style lang="scss" scoped>
.header-container {
  height: 100%;
  padding-left: 10%;
  padding-right: 10%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #dcdfe6;

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
