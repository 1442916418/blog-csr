<template>
  <introduce v-bind="PROJECTS.calculator">
    <div class="mx-auto w-80">
      <div class="p-4 border border-dotted">
        <div v-show="!isSafeInteger" class="p-2 text-sm text-red-400">超出数值安全范围</div>
        <div class="text-right my-2" v-show="history">
          <y-button size="small" @click="handleHistory">历史</y-button>
        </div>
        <div class="p-4 bg-slate-50 shadow-inner text-right">
          <div class="h-6 mb-2">{{ operation.join(' ') }}</div>
          <div class="h-6 font-bold">{{ curKey || result }}</div>
        </div>
        <div class="mt-4 grid gap-2 grid-cols-4 grid-rows-5">
          <y-button
            v-for="k in keys"
            :key="k"
            :type="k === '=' ? 'primary' : 'default'"
            :disabled="isDisabled(k)"
            @click="handleClickKey(k)"
            >{{ k }}</y-button
          >
        </div>
      </div>

      <div v-show="isShowHistory">
        <ul class="list-disc list-inside my-5 space-y-2">
          <template v-for="(value, i) in history" :key="i">
            <li class="cursor-pointer" @click="handleClickHistory(value)">{{ value.join(' ') }}</li>
          </template>
        </ul>
      </div>
    </div>
  </introduce>
</template>

<script lang="ts" setup>
import { computed, reactive, ref } from 'vue'

import introduce from '@/components/introduce/index.vue'
import yButton from '@/components/custom/button/button.vue'

import { PROJECTS } from '@/utils/constant'

/** Variable */
const sign = '+/-'
const spot = '.'
const equal = '='
const arithmeticOperator = {
  addition: '+',
  subtraction: '-',
  multiplication: '*',
  division: '/'
}
const keys = [
  'AC',
  'C',
  'B',
  arithmeticOperator.division,
  '7',
  '8',
  '9',
  arithmeticOperator.multiplication,
  '4',
  '5',
  '6',
  arithmeticOperator.subtraction,
  '1',
  '2',
  '3',
  arithmeticOperator.addition,
  sign,
  '0',
  spot,
  equal
]

let curKey = ref('')
let isShowHistory = ref(false)
const operation = ref<string[]>([])
const history = reactive<any>([])

/** Compute */
const isDisabled = computed(() => {
  return (key: string) =>
    !isSafeInteger.value && [...Object.values(arithmeticOperator), sign, spot, equal].includes(key)
})
// TODO: 小数
const isSafeInteger = computed(() => {
  if (!curKey.value || !Number.isInteger(+curKey.value)) return true

  return Number.isSafeInteger(+curKey.value)
})
const result = computed(() => {
  if (!isSafeInteger.value || !operation.value.includes('=')) return void 0

  const left = +operation.value[0] || 0
  const operator = operation.value[1] || arithmeticOperator.subtraction
  const right = +operation.value[2] || 0
  let result = 0

  switch (operator) {
    case arithmeticOperator.addition:
      if (left < 1 || right < 1) {
        result = (left * 100 + right * 100) / 100
      } else {
        result = left + right
      }
      break
    case arithmeticOperator.subtraction:
      result = left - right
      break
    case arithmeticOperator.multiplication:
      result = left * right
      break
    case arithmeticOperator.division:
      result = left / right
      break
  }

  return result
})

/** Operation */
const handleClickHistory = (value: any) => {
  curKey.value = ''
  operation.value = value
}
const handleHistory = () => {
  isShowHistory.value = !isShowHistory.value
}
const handleClickKey = (key: string) => {
  const isNumber = +key >= 0 && +key <= 9

  if (isNumber || key === spot) {
    if (result.value !== void 0) {
      operation.value.length = 0
    }

    curKey.value += key
  } else {
    if ([...Object.values(arithmeticOperator), equal].includes(key)) {
      if (curKey.value) {
        operation.value.push(curKey.value)
        curKey.value = ''
      }

      if (result.value !== void 0) {
        const oldResult = result.value

        operation.value.length = 0

        operation.value.push(oldResult + '')
      }

      operation.value.push(key)
    }

    switch (key) {
      case 'AC':
        operation.value.length = 0
        history.length = 0
        break
      case 'C':
        operation.value.length = 0
        break
      case 'B':
        if (curKey.value) {
          curKey.value = curKey.value.slice(0, -1)
        } else {
          operation.value.length && operation.value.pop()
        }
        break
      case sign:
        if (curKey.value) {
          const v = curKey.value.includes('-') ? Math.abs(+curKey.value) : +curKey.value * -1

          curKey.value = v + ''
        }
        break
      case equal:
        history.push(JSON.parse(JSON.stringify(operation.value)))
        break
    }
  }
}
</script>
