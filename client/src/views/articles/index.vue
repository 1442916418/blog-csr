<template>
  <div class="articles">
    <el-form
      ref="ruleFormRef"
      :rules="rules"
      :model="ruleForm"
      status-icon
      size="large"
      label-width="120px"
      label-position="top"
    >
      <el-form-item label="标题" prop="title">
        <el-input v-model="ruleForm.title" clearable placeholder="请输入标题" />
      </el-form-item>
      <el-form-item label="描述" prop="description">
        <el-input v-model="ruleForm.description" clearable placeholder="请输入描述" />
      </el-form-item>
      <el-form-item label="内容" prop="body">
        <md-editor v-model="ruleForm.body" :preview="false" :toolbars-exclude="['github', 'save']"></md-editor>
      </el-form-item>
      <el-form-item label="标签" prop="tagList">
        <el-input v-model="tags" clearable placeholder="请输入标签，中文逗号分隔多个" />
      </el-form-item>

      <div class="operation">
        <el-button @click="resetForm(ruleFormRef)" :disabled="loading">重 置</el-button>
        <el-button type="primary" @click="submitForm(ruleFormRef)" :loading="loading">提 交</el-button>
      </div>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'

import { createArticle } from '@/apis'

import { ElMessage, type FormInstance } from 'element-plus'
import type { CreateArticle } from '@/types/request-types'

const ruleFormRef = ref<FormInstance>()
const loading = ref(false)
const tags = ref('')

const ruleForm = reactive<CreateArticle>({
  title: '',
  description: '',
  body: '',
  tagList: []
})

const rules = reactive({
  title: [
    { required: true, message: '请输入标题', trigger: 'change' },
    { min: 5, max: 50, message: '长度 5 - 50 之间', trigger: 'change' }
  ],
  description: [
    { required: true, message: '请输入描述', trigger: 'change' },
    { min: 1, max: 100, message: '长度 1 - 100 之间', trigger: 'change' }
  ]
})

const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return

  formEl.validate((valid) => {
    if (valid) {
      if (!ruleForm.body) {
        ElMessage.warning({ message: '请输入内容' })
        return false
      }
      if (!tags.value) {
        ElMessage.warning({ message: '请输入标签' })
        return false
      }

      handleCreate()
    } else {
      return false
    }
  })
}

const handleCreate = async () => {
  loading.value = true

  ruleForm.tagList = tags.value.split('，')

  const res = await createArticle({ article: ruleForm })

  // TODO: 跳转到文章详情页
  if (res) {
    loading.value = false
    ElMessage.success({ message: '创建成功' })
  } else {
    loading.value = false
  }
}

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}
</script>

<style lang="scss" scoped>
@import '@/views/articles/index.scss';
</style>
