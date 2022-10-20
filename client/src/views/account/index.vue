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
          <el-input v-model="ruleForm.username" />
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="ruleForm.email" />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="ruleForm.password" type="password" autocomplete="off" />
        </el-form-item>
        <el-form-item>
          <div class="operation">
            <el-button @click="resetForm(ruleFormRef)">重 置</el-button>
            <el-button type="primary" @click="submitForm(ruleFormRef)">提 交</el-button>
          </div>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref, computed } from 'vue'
import Schema from 'async-validator'
import { useAccountStore, Status } from '@/stores/account'

import type { FormInstance } from 'element-plus'

const account = useAccountStore()

const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive({
  username: '',
  password: '',
  email: ''
})
const validateRules = reactive({
  signIn: {
    email: [{ required: true, message: '请输入邮箱', trigger: 'blur' }],
    password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
  },
  signUp: {
    username: [
      { required: true, message: '请输入账户名', trigger: 'blur' },
      { min: 5, max: 30, message: '长度 5 - 30 之间', trigger: 'blur' }
    ],
    email: [
      { required: true, message: '请输入邮箱', trigger: 'blur' },
      { type: 'string', required: true, pattern: Schema.validators.email }
    ],
    password: [
      { required: true, message: '请输入密码', trigger: 'blur' },
      { min: 5, max: 30, message: '长度 5 - 30 之间', trigger: 'blur' }
    ]
  }
})

const accountParams = computed(() => {
  return {
    title: account.isSignIn ? '登录' : '注册',
    subTitle: account.isSignIn ? '新建账户' : '已有账户，去登录',
    rules: account.isSignIn ? validateRules.signIn : validateRules.signUp
  }
})

const changeAccountStatus = () => {
  resetForm(ruleFormRef.value)
  account.setStatus(account.isSignIn ? Status.SIGN_UP : Status.SIGN_IN)
}

const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return

  formEl.validate((valid) => {
    if (valid) {
      console.log('submit!')
    } else {
      console.log('error submit!')
      return false
    }
  })
}

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return

  formEl.resetFields()
}
</script>

<style lang="scss" scoped>
@import '@/views/account/index.scss';
</style>
