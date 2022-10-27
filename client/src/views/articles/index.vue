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
        <el-input v-model="tags" clearable placeholder="请输入标签，# 分隔多个" />
      </el-form-item>

      <div class="operation">
        <el-button @click="resetForm(ruleFormRef)" :disabled="loading">重 置</el-button>
        <el-button type="primary" @click="submitForm(ruleFormRef)" :loading="loading">提 交</el-button>
      </div>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'

import { createArticle, getArticleBySlug, updateArticleBySlug } from '@/apis'

import { ElMessage, type FormInstance } from 'element-plus'
import type { CreateArticle } from '@/types/request-types'

/** Use of external methods */
const router = useRouter()
const route = useRoute()

/** Variable */
let isSlug = ref('')

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

/** Operation */
const init = () => {
  const slug = route.params?.slug ?? ''

  isSlug.value = slug as string

  if (slug) {
    getArticleDetailsData()
  }
}
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

      handleSubmitArticleData()
    } else {
      return false
    }
  })
}
const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return

  formEl.resetFields()
}

/** Api */
const handleSubmitArticleData = async () => {
  loading.value = true

  ruleForm.tagList = tags.value.split('#')

  let res = null

  if (isSlug.value) {
    delete ruleForm.tagList

    res = await updateArticleBySlug({ slug: isSlug.value }, { article: ruleForm })
  } else {
    res = await createArticle({ article: ruleForm })
  }

  const article = res?.data?.article || {}

  if (article) {
    loading.value = false
    ElMessage.success({ message: `${isSlug.value ? '修改' : '创建'}成功` })

    if (article?.slug) {
      router.push({ path: '/articleDetails/' + article.slug })
    }
  } else {
    loading.value = false
  }
}
const getArticleDetailsData = async () => {
  if (!isSlug.value) return

  const { data } = await getArticleBySlug({ slug: isSlug.value })

  if (data?.article) {
    const { title, description, body, tagList } = data.article

    tags.value = tagList.join('#')

    Object.assign(ruleForm, {
      title,
      description,
      body,
      tagList: tagList
    })
  }
}

/** Lifecycle Hooks */
onMounted(() => {
  init()
})
</script>

<style lang="scss" scoped>
@import '@/views/articles/index.scss';
</style>
