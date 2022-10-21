<template>
  <div class="articles">
    <el-form ref="ruleFormRef" :model="ruleForm" status-icon :rules="rules" label-width="120px" label-position="top">
      <el-form-item label="标题" prop="title">
        <el-input v-model="ruleForm.title" clearable placeholder="请输入标题" />
      </el-form-item>
      <el-form-item label="描述" prop="description">
        <el-input v-model="ruleForm.description" clearable placeholder="请输入描述" />
      </el-form-item>
      <el-form-item label="内容" prop="body">
        <el-input v-model="ruleForm.body" />
      </el-form-item>
      <el-form-item label="标签" prop="tagList">
        <el-select v-model="ruleForm" placeholder="请选择标签" clearable filterable>
          <el-option v-for="item in tagDataList" :key="item" :label="item" :value="item"> </el-option>
        </el-select>
      </el-form-item>

      <div class="operation">
        <el-button @click="resetForm(ruleFormRef)" :disabled="loading">重 置</el-button>
        <el-button type="primary" @click="submitForm(ruleFormRef)" :loading="loading">提 交</el-button>
      </div>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, reactive, ref } from 'vue'

import { getTags } from '@/apis'

import type { FormInstance } from 'element-plus'
import type { CreateArticle } from '@/types/request-types'

const ruleFormRef = ref<FormInstance>()
const tagDataList = ref<string[]>([])
const loading = ref(false)

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
  ],
  body: [{ required: true, message: '请输入内容', trigger: 'change' }],
  tagList: [{ required: true, message: '请选择标签', trigger: 'change' }]
})

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

const handleGetTags = () => {
  getTags()
    .then((res) => {
      tagDataList.value = res.data?.tags ?? []
    })
    .catch(() => {
      tagDataList.value = []
    })
}

onMounted(() => {
  handleGetTags()
})
</script>

<style lang="scss" scoped>
@import '@/views/articles/index.scss';
</style>
