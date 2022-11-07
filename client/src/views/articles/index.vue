<template>
  <div class="w-4/5 my-5 mx-auto">
    <ul class="list-disc list-inside my-5 space-y-2">
      <template v-for="rule in validateRules" :key="rule">
        <li class="text-red-600">{{ rule }}</li>
      </template>
    </ul>

    <form action="" id="articleForm" class="my-5 flex flex-col space-y-4">
      <div>
        <label for="title">标题</label><br />
        <input
          class="w-full mt-2"
          type="text"
          name="title"
          id="title"
          placeholder="请输入标题"
          v-model="ruleForm.title"
        />
      </div>
      <div>
        <label for="description">描述</label><br />
        <input
          class="w-full mt-2"
          type="text"
          name="description"
          id="description"
          placeholder="请输入描述"
          v-model="ruleForm.description"
        />
      </div>
      <div class="w-full mt-2">
        <md-editor
          v-model="ruleForm.body"
          :preview="false"
          :toolbars-exclude="['github', 'save']"
          @onHtmlChanged="handleEditorHtml"
        ></md-editor>
      </div>
      <div class="w-full mt-2">
        <div>
          <div class="mb-4" v-if="!isSlug">
            <input
              class="ml-1 w-2/4"
              type="text"
              id="newTagInput"
              placeholder="新增一个标签/选择点击选择标签"
              v-model="newTagValue"
            />
          </div>
          <div class="space-x-2 space-y-2">
            <template v-for="tag in tagList" :key="tag">
              <y-button
                size="small"
                :type="tags.includes(tag) ? 'primary' : 'default'"
                @click.prevent="handleClickTag(tag)"
                >{{ tag }}</y-button
              >
            </template>
          </div>
        </div>
      </div>
    </form>

    <div class="my-6 text-right space-x-2">
      <y-button @click="handleGoBack" :disabled="loading">返回</y-button>
      <y-button type="warning" @click="resetForm" :disabled="loading">重 置</y-button>
      <y-button type="primary" @click="submitForm" :loading="loading">提 交</y-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive, ref, onMounted, computed, nextTick } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import htmlToMarkdown from '@wcj/html-to-markdown'

import { createArticle, getArticleBySlug, getTags, updateArticleBySlug } from '@/apis'

import { Message } from '@/components/custom/message/message'
import type { CreateArticle } from '@/types/request-types'

import yButton from '@/components/custom/button/button.vue'

/** Use of external methods */
const router = useRouter()
const route = useRoute()

/** Variable */
let isSlug = ref('')
let htmlBody = ref('')
let tagList = ref<string[]>([])
let newTagValue = ref('')
let validateRules = ref<string[]>([])

const loading = ref(false)
const tags = ref<string[]>([])
const ruleForm = reactive<CreateArticle>({
  title: '',
  description: '',
  body: '',
  tagList: []
})

/** Compute */
const formTags = computed(() => {
  if (!tags.value.length && !newTagValue.value) return []

  const result = tags.value

  if (newTagValue.value) {
    result.push(newTagValue.value)
  }

  return result
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
const handleFormValidate = () => {
  const { title, description, body } = ruleForm
  const result = []

  if (!title) {
    result.push('请输入标题')
  } else if (title.length < 5 || title.length > 50) {
    result.push('标题长度 5 - 50 之间')
  }

  if (!description) {
    result.push('请输入描述')
  } else if (!description.length || description.length > 100) {
    result.push('描述长度 1 - 100 之间')
  }

  if (!body) {
    result.push('请输入内容')
  }

  if (!formTags.value.length) {
    result.push('请输入/选择标签')
  }

  validateRules.value = result
}
const submitForm = () => {
  handleFormValidate()

  if (validateRules.value.length) return

  try {
    handleSubmitArticleData()
  } finally {
    loading.value = false
  }
}
const resetForm = () => {
  htmlBody.value = ''
  validateRules.value = []
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
    Message.success(`${isSlug.value ? '修改' : '创建'}成功`)

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
      description
    })

    if (body) {
      htmlToMarkdown({ html: body })
        .then((res) => {
          ruleForm.body = res
        })
        .catch(() => {
          ruleForm.body = ''
        })
    }
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
