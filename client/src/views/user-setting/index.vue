<template>
  <div class="w-2/3 my-5 mx-auto flex flex-col">
    <div class="text-center">
      <h1 class="tracking-widest font-bold text-2xl">设 置</h1>
    </div>
    <div>
      <ul class="list-disc list-inside my-5 space-y-2">
        <template v-for="rule in validateRules" :key="rule">
          <li class="text-red-600">{{ rule }}</li>
        </template>
      </ul>

      <form action="" id="resetForm" class="my-5 flex flex-col space-y-4">
        <div>
          <label for="username">账户名</label><br />
          <input
            class="w-full mt-2"
            type="text"
            name="username"
            id="username"
            placeholder="请输入账户名"
            @input="handleInputValue($event, 'username')"
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
            @input="handleInputValue($event, 'email')"
          />
        </div>
        <div>
          <label for="password">新密码</label><br />
          <input
            class="w-full mt-2"
            type="password"
            name="password"
            id="password"
            placeholder="请输入新密码"
            @input="handleInputValue($event, 'password')"
          />
        </div>
        <div>
          <label for="bio">描述</label><br />
          <textarea
            class="w-full mt-2"
            name="bio"
            id="bio"
            cols="30"
            rows="10"
            placeholder="请输入描述"
            @input="handleInputValue($event, 'bio')"
          ></textarea>
        </div>
        <div>
          <label for="image">头像</label><br />
          <input
            class="w-full mt-2"
            type="text"
            name="image"
            id="image"
            placeholder="请输入头像"
            @input="handleInputValue($event, 'image')"
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
import { reactive, ref, onMounted, nextTick } from 'vue'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'

import { useUserStore } from '@/stores/user'
import { useAccountStore, Status } from '@/stores/account'
import { updateCurrentUser } from '@/apis'

import { validateEmail } from '@/utils/constant'
import { handleRequestParam } from '@/utils/common'

import yButton from '@/components/custom/button/button.vue'

/** Use of external methods */
const router = useRouter()
const user = useUserStore()
const account = useAccountStore()

/** Variable */
const loading = ref(false)
const ruleForm = reactive({
  username: '',
  email: '',
  image: '',
  bio: '',
  password: ''
})
let validateRules = ref<string[]>([])

/** Operation */
const handleInputValue = (e: any, key: 'username' | 'password' | 'email' | 'bio' | 'image') => {
  ruleForm[key] = e.target?.value ?? ''
}
const init = () => {
  const { userName, userEmail, userImage, userDescribe } = user

  Object.assign(ruleForm, {
    username: userName || '',
    email: userEmail || '',
    image: userImage || '',
    bio: userDescribe || ''
  })

  nextTick(() => {
    const userNameEle = document.querySelector('#username') as HTMLInputElement
    const emailEle = document.querySelector('#email') as HTMLInputElement
    const imageEle = document.querySelector('#image') as HTMLInputElement
    const bioEle = document.querySelector('#bio') as HTMLInputElement

    userNameEle.value = userName || ''
    emailEle.value = userEmail || ''
    imageEle.value = userImage || ''
    bioEle.value = userDescribe || ''
  })
}
const resetForm = () => {
  const resetForm = document.querySelector('#resetForm') as HTMLFormElement
  resetForm && resetForm.reset()

  validateRules.value = []
  Object.assign(ruleForm, {
    username: '',
    password: '',
    email: '',
    bio: '',
    image: ''
  })
}
const handleFormValidate = () => {
  const { username, email } = ruleForm
  const result = []

  if (!username) {
    result.push('请输入账户名')
  } else if (!username.length || username.length > 30) {
    result.push('账户名长度 1 - 30 之间')
  }

  if (!email) {
    result.push('请输入邮箱')
  } else if (!validateEmail.test(email)) {
    result.push('请输入正确的邮箱')
  }

  validateRules.value = result
}
const submitForm = () => {
  handleFormValidate()

  if (validateRules.value.length) return

  updateCurrentUserData()
}

/** Api */
const updateCurrentUserData = async () => {
  const userParams = handleRequestParam(ruleForm)
  const { data } = await updateCurrentUser({ user: userParams })

  if (data.user) {
    user.setUser(data.user)

    const isPassword = userParams?.password ?? undefined

    ElMessage.success(`保存成功${isPassword ? '，请重新登录' : ''}`)

    if (isPassword) {
      user.resetUser()
      window.sessionStorage.clear()
      account.setStatus(Status.SIGN_IN)
      router.replace({ path: '/account' })
    } else {
      router.push({ path: '/user/' + data.user.username })
    }
  }
}

/** Lifecycle Hooks */
onMounted(() => {
  init()
})
</script>
