<template>
  <introduce v-bind="PROJECTS.countdownTimer">
    <div class="mx-auto w-3/4 flex">
      <div class="w-60 flex flex-col space-y-4">
        <div>
          <label for="name">名称</label>
          <input type="text" name="name" id="name" class="w-full" placeholder="请输入名称" v-model="params.name" />
        </div>
        <div>
          <label for="datetime">日期时间</label>
          <input type="datetime-local" name="datetime" id="datetime" class="w-full" v-model="params.datetime" />
        </div>
        <div class="text-center">
          <y-button @click="handleReset" class="mr-5">重 置</y-button>
          <y-button type="primary" @click="handleSubmit">开 始</y-button>
        </div>
      </div>
      <div class="ml-5 flex-1 space-y-4">
        <template v-for="item in list" :key="item.datetime">
          <timer-component :name="item.name" :date="item.datetime" />
        </template>
      </div>
    </div>
  </introduce>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'

import introduce from '@/components/introduce/index.vue'
import yButton from '@/components/custom/button/button.vue'
import timerComponent from './timer.vue'

import { PROJECTS } from '@/utils/constant'

interface IParams {
  name: string
  datetime: string
}

/** Variable */
const list = ref<IParams[]>([])
const params = reactive<IParams>({
  name: '',
  datetime: ''
})

/** Operation */
const handleReset = () => {
  params.name = ''
  params.datetime = ''
}
const handleSubmit = () => {
  if (params.name && params.datetime) {
    list.value.push(JSON.parse(JSON.stringify(params)))
    handleReset()
  }
}
</script>

<style lang="postcss" scoped></style>
