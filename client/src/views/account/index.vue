<template>
  <div class="account">
    <div class="account-header">
      <h1>{{ accountParams.title }}</h1>
      <el-button type="success" link @click="changeAccountStatus">{{ accountParams.subTitle }}</el-button>
    </div>
    <div class="account-body">
      <el-form
        ref="ruleFormRef"
        :rules="accountParams.rules"
        :model="ruleForm"
        status-icon
        size="large"
        label-width="120px"
        label-position="top"
      >
        <el-form-item label="账户名" prop="username" v-if="!account.isSignIn">
          <el-input v-model="ruleForm.username" placeholder="请输入账户名" />
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="ruleForm.email" placeholder="请输入邮箱" />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="ruleForm.password" type="password" autocomplete="off" placeholder="请输入密码" />
        </el-form-item>

        <div class="operation">
          <el-button @click="resetForm(ruleFormRef)" :disabled="loading">重 置</el-button>
          <el-button type="primary" @click="submitForm(ruleFormRef)" :loading="loading">提 交</el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref, computed } from 'vue'
import { ElMessage } from 'element-plus'
import { useRouter, useRoute } from 'vue-router'

import { useAccountStore, Status } from '@/stores/account'
import { useUserStore } from '@/stores/user'
import { userLogin, userRegister } from '@/apis'

import type { FormInstance } from 'element-plus'
import { validateEmail } from '@/utils/constant'

/** Use of external methods */
const router = useRouter()
const route = useRoute()
const user = useUserStore()
const account = useAccountStore()

/** Variable */
const loading = ref(false)
const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive({
  username: '',
  password: '',
  email: ''
})
const validateRules = reactive({
  signIn: {
    email: [
      { required: true, message: '请输入邮箱', trigger: 'blur' },
      {
        type: 'string',
        pattern: validateEmail,
        message: '请输入正确的邮箱',
        trigger: 'blur'
      }
    ],
    password: [
      { required: true, message: '请输入密码', trigger: 'blur' },
      { min: 5, max: 30, message: '长度 5 - 30 之间', trigger: 'blur' }
    ]
  },
  signUp: {
    username: [
      { required: true, message: '请输入账户名', trigger: 'blur' },
      { min: 1, max: 30, message: '长度 1 - 30 之间', trigger: 'blur' }
    ]
  }
})

/** Compute */
const accountParams = computed(() => {
  return {
    title: account.isSignIn ? '登录' : '注册',
    subTitle: account.isSignIn ? '新建账户' : '已有账户，去登录',
    rules: account.isSignIn ? validateRules.signIn : { ...validateRules.signUp, ...validateRules.signIn }
  }
})

/** Operation */
const changeAccountStatus = () => {
  resetForm(ruleFormRef.value)
  account.setStatus(account.isSignIn ? Status.SIGN_UP : Status.SIGN_IN)
}
const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return

  formEl.resetFields()
}
const handleSignIn = async () => {
  try {
    loading.value = true

    const { email, password } = ruleForm
    const { data } = await userLogin({ user: { email, password } })

    if (data.user) {
      user.setUser(data.user)
      ElMessage.success({ message: '登录成功' })

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
      ElMessage.success({ message: '注册并登录成功' })

      handleRedirect()
    }

    loading.value = false
  } catch (error) {
    loading.value = false
  }
}
const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return

  formEl.validate((valid) => {
    if (valid) {
      if (account.isSignIn) {
        handleSignIn()
      } else {
        handleSignUp()
      }
    } else {
      return false
    }
  })
}
const handleRedirect = () => {
  const redirect = (route?.query.redirect ?? '') as string

  router.push({ path: redirect ? redirect : '/' })
}
</script>

<style lang="scss" scoped>
@import '@/views/account/index.scss';
</style>
