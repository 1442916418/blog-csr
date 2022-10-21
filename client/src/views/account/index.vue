<template>
  <div class="account">
    <div class="account-header">
      <h1>{{ accountParams.title }}</h1>
      <el-button type="success" link @click="changeAccountStatus">{{ accountParams.subTitle }}</el-button>
    </div>
    <div class="account-body">
      <el-form
        ref="ruleFormRef"
        :model="ruleForm"
        status-icon
        :rules="accountParams.rules"
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
import { useRouter } from 'vue-router'

import { useAccountStore, Status } from '@/stores/account'
import { useUserStore } from '@/stores/user'
import { userLogin, userRegister } from '@/apis'

import type { FormInstance } from 'element-plus'
import { validateEmail } from '@/utils/constant'

const router = useRouter()
const user = useUserStore()
const account = useAccountStore()

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
      { required: true, message: '请输入邮箱', trigger: 'change' },
      {
        type: 'string',
        pattern: validateEmail,
        message: '请输入正确的邮箱',
        trigger: 'change'
      }
    ],
    password: [
      { required: true, message: '请输入密码', trigger: 'change' },
      { min: 5, max: 30, message: '长度 5 - 30 之间', trigger: 'change' }
    ]
  },
  signUp: {
    username: [
      { required: true, message: '请输入账户名', trigger: 'change' },
      { min: 5, max: 30, message: '长度 5 - 30 之间', trigger: 'change' }
    ]
  }
})

const accountParams = computed(() => {
  return {
    title: account.isSignIn ? '登录' : '注册',
    subTitle: account.isSignIn ? '新建账户' : '已有账户，去登录',
    rules: account.isSignIn ? validateRules.signIn : { ...validateRules.signUp, ...validateRules.signIn }
  }
})

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

      setTimeout(() => {
        router.push({ path: '/' })
      }, 500)
    }

    loading.value = false
  } catch (error) {
    console.log('🚀 ~ file: index.vue ~ line 120 ~ handleSignIn ~ error', error)
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

      setTimeout(() => {
        router.push({ path: '/' })
      }, 500)
    }

    loading.value = false
  } catch (error) {
    console.log('🚀 ~ file: index.vue ~ line 141 ~ handleSignUp ~ error', error)
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
</script>

<style lang="scss" scoped>
@import '@/views/account/index.scss';
</style>
