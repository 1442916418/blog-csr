<template>
  <header class="header">
    <div class="text-left font-bold cursor-pointer hover:text-blue-600 dark:text-gray-50" @click="jumpPage('/')">
      Home
    </div>
    <div class="flex-1 flex justify-end items-center space-x-2 dark:text-gray-50">
      <UseDark v-slot="{ toggleDark }">
        <span
          class="h-8 w-8 rounded-full flex items-center justify-center cursor-pointer hover:bg-blue-100 dark:hover:bg-gray-600"
          @click="
            () => {
              const value = toggleDark()

              theme.setStatus(value)
            }
          "
        >
          <i class="iconfont icon-lights"></i>
        </span>
      </UseDark>

      <template v-if="user.isUser">
        <div class="hidden md:hidden lg:flex xl:flex 2xl:flex">
          <y-button type="info" link @click="jumpPage('/articles')">
            <i class="iconfont icon-add"></i>
            创建新文章
          </y-button>
          <y-button type="info" link @click="jumpPage('/userSetting')">
            <i class="iconfont icon-edit"></i>
            用户配置
          </y-button>
        </div>

        <avatar :user="userAvatar" @click="jumpPage('/user/' + user.userName)"></avatar>

        <y-button type="danger" link @click="handleLogout">登 出</y-button>
      </template>
      <template v-else>
        <y-button type="info" link @click="handleAccount(Status.SIGN_IN)">
          <i class="iconfont icon-account"></i>
          登 录
        </y-button>
        <y-button type="info" link @click="handleAccount(Status.SIGN_UP)">
          <i class="iconfont icon-add-account"></i>
          注 册
        </y-button>
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
import { useThemeStore } from '@/stores/theme'
import { Status, useAccountStore } from '@/stores/account'
import { UseDark } from '@vueuse/components'

import yModal from '@/components/custom/modal/modal.vue'
import avatar from '@/components/avatar/index.vue'
import yButton from '@/components/custom/button/button.vue'

import type { RouteParamsRaw } from 'vue-router'

/** Use of external methods */
const user = useUserStore()
const account = useAccountStore()
const router = useRouter()
const route = useRoute()
const theme = useThemeStore()

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
    @apply px-4 py-3 h-12 flex justify-center items-center dark:bg-gray-800;
  }
}
</style>
