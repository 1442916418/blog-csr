<template>
  <introduce v-bind="PROJECTS.indexedDB">
    <div class="mx-auto w-3/4">
      <div class="mb-4 flex items-center">
        <div>
          <label for="name" class="mr-2">名称</label>
          <input type="text" name="name" id="name" v-model="params.name" />
        </div>
        <div class="mx-4">
          <label for="email" class="mr-2">邮箱</label>
          <input type="text" name="email" id="email" v-model="params.email" />
        </div>
        <div>
          <y-button class="mr-4" size="small" @click="handleReset">重 置</y-button>
          <y-button type="primary" size="small" @click="handleSubmit">提 交</y-button>
        </div>
      </div>

      <div class="p-4 flex justify-between items-start bg-gray-50 rounded">
        <table class="flex-1 mr-4">
          <thead>
            <tr>
              <th>名称</th>
              <th>邮箱</th>
              <th>
                <y-button type="danger" size="small" @click="handleClear" v-show="list.length">清 空</y-button>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, i) in list" :key="i" class="h-8">
              <td>{{ item.name }}</td>
              <td>{{ item.email }}</td>
              <td>
                <y-button type="warning" size="small" @click="handleRemove(item.email)">删 除</y-button>
              </td>
            </tr>
          </tbody>
        </table>

        <div class="w-40 h-80 overflow-x-hidden overflow-y-auto">
          <div v-for="(msg, j) in msgList" :key="j" class="p-1 text-sm">{{ msg }}</div>
        </div>
      </div>
    </div>
  </introduce>
</template>

<script lang="ts" setup>
import { reactive, ref, watch, onMounted } from 'vue'

import introduce from '@/components/introduce/index.vue'
import yButton from '@/components/custom/button/button.vue'

import { PROJECTS } from '@/assets/constant'
import { RESULT } from './constant'
import Message from './message'
import Customer from './index'

import type { FormParams } from './types'

/** Variable */
let customer: Customer | undefined = void 0
let list = ref<FormParams[]>([])
let msgList = ref<string[]>([])

const params = reactive<FormParams>({
  name: '',
  email: ''
})

/** Compute */
watch(
  () => Message.get(),
  (value) => {
    msgList.value = value
  },
  { deep: true, immediate: true }
)

/** Operation */
const init = () => {
  Message.clear()
  Message.add(RESULT.APP_INIT)

  customer = new Customer()

  setTimeout(() => {
    handleQuery()
  }, 1500)
}
const handleClear = () => {
  if (!customer) return

  list.value.forEach(async (item) => {
    await customer?.handleRemove(item.email)
  })

  handleQuery()
}
const handleRemove = async (email: string) => {
  if (!customer) return

  await customer.handleRemove(email)

  handleQuery()
}
const handleReset = () => {
  params.name = ''
  params.email = ''
}
const handleSubmit = async () => {
  if (!customer || !params.name || !params.email) return

  await customer.handleAdd(JSON.parse(JSON.stringify(params)))

  handleQuery()
  handleReset()
}
const handleQuery = async () => {
  if (!customer) {
    list.value.length = 0
    return
  }

  const res = (await customer.handleGetAll()) as FormParams[]

  list.value = res || []
}

/** Lifecycle Hooks */
onMounted(() => {
  init()
})
</script>

<style scoped>
table {
  border: 1px solid gray;
  background-color: white;
}
thead tr {
  border-bottom: 1px solid gray;
}
tbody tr {
  border-bottom: 1px solid gray;
}
tbody td {
  text-align: center;
}
tbody tr:nth-child(even) {
  background-color: #f3f4f6;
}
</style>
