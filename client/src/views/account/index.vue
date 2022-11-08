<template>
  <div class="lg:w-1/3 xl:w-1/3 2xl:2-1/3 p-4 my-5 mx-auto flex flex-col">
    <div class="text-center">
      <h1 class="tracking-widest font-bold text-2xl">{{ accountParams.title }}</h1>
      <y-button type="success" link @click="changeAccountStatus">{{ accountParams.subTitle }}</y-button>
    </div>
    <div>
      <ul class="list-disc list-inside my-5 space-y-2">
        <template v-for="rule in validateRules" :key="rule">
          <li class="text-red-600">{{ rule }}</li>
        </template>
      </ul>

      <form action="" id="accountForm" class="my-5 flex flex-col space-y-4">
        <div v-if="!account.isSignIn">
          <label for="username">账户名</label><br />
          <input
            class="w-full mt-2"
            type="text"
            name="username"
            id="username"
            placeholder="请输入账户名"
            v-model="ruleForm.username"
          />
        </div>
        <div>
          <label for="email">邮箱</label><br />
          <input
            class="w-full mt-2"
            type="email"
            name="email"
            id="email"
            placeholder="请输入邮箱"
            v-model="ruleForm.email"
          />
        </div>
        <div>
          <label for="password">密码</label><br />
          <input
            class="w-full mt-2"
            type="password"
            name="password"
            id="password"
            placeholder="请输入密码"
            v-model="ruleForm.password"
          />
        </div>
      </form>

      <div class="my-6 text-right space-x-2">
        <y-button @click="resetForm" :disabled="loading">重 置</y-button>
        <y-button type="primary" @click="submitForm" :loading="loading">提 交</y-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref, computed, watch } from 'vue'
import { Message } from '@/components/custom/message/message'
import { useRouter, useRoute } from 'vue-router'

import { useAccountStore, Status } from '@/stores/account'
import { useUserStore } from '@/stores/user'
import { userLogin, userRegister } from '@/apis'

import { validateEmail } from '@/utils/constant'

import yButton from '@/components/custom/button/button.vue'

/** Use of external methods */
const router = useRouter()
const route = useRoute()
const user = useUserStore()
const account = useAccountStore()

/** Variable */
const loading = ref(false)
let validateRules = ref<string[]>([])
const ruleForm = reactive({
  username: '',
  password: '',
  email: ''
})

/** Compute */
const accountParams = computed(() => {
  return {
    title: account.isSignIn ? '登录' : '注册',
    subTitle: account.isSignIn ? '新建账户' : '已有账户，去登录'
  }
})

/** Watch */
watch(
  () => account.isSignIn,
  () => {
    resetForm()
  }
)

/** Operation */
const changeAccountStatus = () => {
  resetForm()
  account.setStatus(account.isSignIn ? Status.SIGN_UP : Status.SIGN_IN)
}
const resetForm = () => {
  validateRules.value = []
  Object.assign(ruleForm, {
    username: '',
    password: '',
    email: ''
  })
}
const handleSignIn = async () => {
  try {
    loading.value = true

    const { email, password } = ruleForm
    const { data } = await userLogin({ user: { email, password } })

    if (data.user) {
      user.setUser(data.user)
      Message.success('登录成功')

      handleRedirect()
    }

    loading.value = false
  } catch (error) {
    loading.value = false
  }
}
const handleSignUp = async () => {
  try {
    loading.value = true

    const { data } = await userRegister({ user: ruleForm })

    if (data.user) {
      user.setUser(data.user)
      Message.success('注册并登录成功')

      handleRedirect()
    }

    loading.value = false
  } catch (error) {
    loading.value = false
  }
}
const handleFormValidate = () => {
  const { username, password, email } = ruleForm
  const result = []

  if (!account.isSignIn) {
    if (!username) {
      result.push('请输入账户名')
    } else if (!username.length || username.length > 30) {
      result.push('账户名长度 1 - 30 之间')
    }
  }

  if (!email) {
    result.push('请输入邮箱')
  } else if (!validateEmail.test(email)) {
    result.push('请输入正确的邮箱')
  }

  if (!password) {
    result.push('请输入密码')
  } else if (password.length < 5 || password.length > 30) {
    result.push('密码长度 5 - 30 之间')
  }

  validateRules.value = result
}
const submitForm = () => {
  handleFormValidate()

  if (validateRules.value.length) return

  if (account.isSignIn) {
    handleSignIn()
  } else {
    handleSignUp()
  }
}
const handleRedirect = () => {
  const redirect = (route?.query.redirect ?? '') as string

  router.push({ path: redirect ? redirect : '/' })
}
</script>
