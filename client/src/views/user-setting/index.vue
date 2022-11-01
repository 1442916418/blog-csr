<template>
  <div class="user-setting">
    <div class="user-setting-title">
      <h1>设 置</h1>
    </div>
    <div class="user-setting-body">
      <el-form
        ref="ruleFormRef"
        :rules="validateRules"
        :model="ruleForm"
        status-icon
        size="large"
        label-width="120px"
        label-position="top"
      >
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="ruleForm.email" placeholder="请输入邮箱" />
        </el-form-item>
        <el-form-item label="账户名" prop="username">
          <el-input v-model="ruleForm.username" placeholder="请输入账户名" />
        </el-form-item>
        <el-form-item label="新密码" prop="password">
          <el-input v-model="ruleForm.password" type="password" autocomplete="off" placeholder="请输入新密码" />
        </el-form-item>
        <el-form-item label="描述" prop="bio">
          <el-input
            v-model="ruleForm.bio"
            :autosize="{ minRows: 5, maxRows: 15 }"
            placeholder="请输入个人描述"
            maxlength="300"
            type="textarea"
          />
        </el-form-item>
        <el-form-item label="头像" prop="image">
          <el-input v-model="ruleForm.image" placeholder="请输入头像链接" />
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
import { reactive, ref, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'

import { useUserStore } from '@/stores/user'
import { useAccountStore, Status } from '@/stores/account'
import { updateCurrentUser } from '@/apis'

import { validateEmail } from '@/utils/constant'
import { handleRequestParam } from '@/utils/common'

import type { FormInstance } from 'element-plus'

/** Use of external methods */
const router = useRouter()
const user = useUserStore()
const account = useAccountStore()

/** Variable */
const loading = ref(false)
const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive({
  username: '',
  email: '',
  image: '',
  bio: '',
  password: ''
})
const validateRules = reactive({
  username: [
    { required: true, message: '请输入账户名', trigger: 'change' },
    { min: 1, max: 30, message: '长度 1 - 30 之间', trigger: 'change' }
  ],
  email: [
    { required: true, message: '请输入邮箱', trigger: 'change' },
    {
      type: 'string',
      pattern: validateEmail,
      message: '请输入正确的邮箱',
      trigger: 'change'
    }
  ]
})

/** Operation */
const init = () => {
  Object.assign(ruleForm, {
    username: user.userName || '',
    email: user.userEmail || '',
    image: user.userImage || '',
    bio: user.userDescribe || ''
  })
}
const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return

  formEl.resetFields()
}
const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return

  formEl.validate((valid) => {
    if (valid) {
      updateCurrentUserData()
    } else {
      return false
    }
  })
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

<style lang="scss" scoped>
@import '@/views/user-setting/index.scss';
</style>
