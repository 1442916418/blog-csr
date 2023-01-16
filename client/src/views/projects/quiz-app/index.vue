<template>
  <introduce v-bind="PROJECTS.quizApp">
    <div>
      <exercise-component
        :item="exerciseItem"
        :answer="curAnswer"
        :index="index"
        @update:answer="handleAnswer"
        @select:answer="handleAnswerList"
      />

      <div class="mt-4 space-y-2">
        <y-button class="w-full" type="primary" :disabled="!curAnswer" plain @click="handleNext">下一题</y-button>
        <y-button class="w-full" type="primary" :disabled="submitDisabled" plain @click="handleSubmit">提 交</y-button>
      </div>
    </div>

    <div class="mt-10" v-show="isDetails">
      <div class="my-4 font-bold text-blue-600">恭喜完成答题</div>

      <div class="grid grid-cols-5 gap-2">
        <template v-for="(item, i) in answerList" :key="item.exercises.id">
          <div
            class="p-2 rounded text-sm text-center text-white"
            :class="[item.isSuccess ? ' bg-green-400 ' : 'bg-red-400']"
          >
            {{ i + 1 }}
          </div>
        </template>
      </div>
    </div>
  </introduce>
</template>

<script lang="ts" setup>
import { ref, computed, reactive } from 'vue'

import introduce from '@/components/introduce/index.vue'
import exerciseComponent from './exercise.vue'
import yButton from '@/components/custom/button/button.vue'

import { PROJECTS } from '@/assets/constant'
import exerciseList from '@/assets/constant/exercises'

import type { selectedAnswerParams } from './types'

/** Variable */
let isDetails = ref(false)
let curAnswer = ref('')
let answerList = reactive<selectedAnswerParams[]>([])
let index = ref(0)

/** Compute */
const exerciseItem = computed(() => exerciseList[index.value])
const submitDisabled = computed(() => index.value !== answerList.length - 1)

/** Operation */
const handleAnswer = (value: string) => {
  curAnswer.value = value
}
const handleAnswerList = (params: selectedAnswerParams) => {
  answerList.push(params)
}
const handleNext = () => {
  if (index.value < exerciseList.length - 1) {
    ++index.value
    curAnswer.value = ''
  }
}
const handleSubmit = () => {
  isDetails.value = !isDetails.value
}
</script>
