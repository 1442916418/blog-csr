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
        <md-editor
          v-model="ruleForm.body"
          :preview="false"
          :toolbars-exclude="['github', 'save']"
          @onHtmlChanged="handleEditorHtml"
        ></md-editor>
      </el-form-item>
      <el-form-item label="标签" prop="tagList">
        <div class="tags">
          <div class="tags-new" v-if="!isSlug">
            <el-input v-model="newTagValue" class="ml-1 w-20" placeholder="新增一个标签/选择点击选择标签" />
          </div>
          <div class="tags-list">
            <template v-for="tag in tagList" :key="tag">
              <el-tag class="tag" :effect="tags.includes(tag) ? 'dark' : 'plain'" @click="handleClickTag(tag)">{{
                tag
              }}</el-tag>
            </template>
          </div>
        </div>
      </el-form-item>

      <div class="operation">
        <el-button @click="handleGoBack" :disabled="loading">返回</el-button>
        <el-button type="warning" @click="resetForm(ruleFormRef)" :disabled="loading">重 置</el-button>
        <el-button type="primary" @click="submitForm(ruleFormRef)" :loading="loading">提 交</el-button>
      </div>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref, onMounted, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'

import { createArticle, getArticleBySlug, getTags, updateArticleBySlug } from '@/apis'

import { ElMessage } from 'element-plus'
import type { FormInstance, ElInput } from 'element-plus'
import type { CreateArticle } from '@/types/request-types'

/** Use of external methods */
const router = useRouter()
const route = useRoute()

/** Variable */
let isSlug = ref('')
let htmlBody = ref('')
let tagList = ref<string[]>([])
let newTagValue = ref('')

const ruleFormRef = ref<FormInstance>()
const loading = ref(false)
const tags = ref<string[]>([])
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

/** Compute */
const formTags = computed(() => {
  if (tags.value && newTagValue.value) return []

  return [...tags.value, newTagValue.value]
})

/** Operation */
const init = () => {
  getAllTagsData()

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
      if (!formTags.value.length) {
        ElMessage.warning({ message: '请输入标签' })
        return false
      }

      try {
        handleSubmitArticleData()
      } finally {
        loading.value = false
      }
    } else {
      return false
    }
  })
}
const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return

  formEl.resetFields()
  htmlBody.value = ''
}
const handleEditorHtml = (html: string) => {
  htmlBody.value = html
}
const handleClickTag = (tag: string) => {
  if (tags.value.includes(tag)) {
    tags.value = tags.value.filter((t) => t !== tag)
  } else {
    tags.value.push(tag)
  }
}
const handleGoBack = () => router.back()

/** Api */
const handleSubmitArticleData = async () => {
  loading.value = true

  const formResult = Object.assign({}, ruleForm, {
    body: htmlBody.value,
    tagList: formTags.value
  })

  let res = null

  if (isSlug.value) {
    // TODO: tagList 修改
    // @ts-ignore
    delete formResult.tagList

    res = await updateArticleBySlug({ slug: isSlug.value }, { article: formResult }).finally(() => {
      loading.value = false
    })
  } else {
    res = await createArticle({ article: formResult }).finally(() => {
      loading.value = false
    })
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

    tags.value = tagList

    Object.assign(ruleForm, {
      title,
      description,
      body,
      tagList: tagList
    })
  }
}
const getAllTagsData = async () => {
  const { data } = await getTags()

  tagList.value = data.tags
}

/** Lifecycle Hooks */
onMounted(() => {
  init()
})
</script>

<style lang="scss" scoped>
@import '@/views/articles/index.scss';
</style>
