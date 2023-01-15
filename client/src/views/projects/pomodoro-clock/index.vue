<template>
  <introduce v-bind="PROJECTS.pomodoroClock">
    <div class="p-4 flex flex-col justify-center items-center">
      <div class="w-48 h-48 flex flex-col justify-center items-center text-white bg-purple-600 rounded-full">
        <span> {{ timerStatus === 'WORK' ? '工作' : '休息' }} </span>
        <span class="text-4xl my-2">{{ timer }}</span>
        <span
          class="p-1 rounded-md cursor-pointer"
          @click="handleBtnOperation(operationStatus === 'START' ? 'PAUSE' : 'START')"
          >{{ operationStatus === 'START' ? '暂停' : '开始' }}</span
        >
        <span
          class="p-1 rounded-md cursor-pointer"
          @click="handleBtnOperation('RESET')"
          v-show="operationStatus === 'PAUSE'"
          >重置</span
        >
      </div>
      <div class="mt-10 flex" v-show="operationStatus !== 'START'">
        <div>
          <label for="session" class="text-sm">工作</label>
          <input
            type="number"
            name="session"
            id="session"
            min="5"
            max="60"
            step="5"
            v-model="session"
            class="w-16 ml-2 rounded"
            @change="changeNumber($event, 'session')"
          />
        </div>
        <div class="ml-2">
          <label for="space" class="text-sm">休息</label>
          <input
            type="number"
            name="space"
            id="space"
            min="5"
            max="20"
            step="1"
            v-model="space"
            class="w-16 ml-2 rounded"
            @change="changeNumber($event, 'space')"
          />
        </div>
      </div>
    </div>
  </introduce>
</template>

<script lang="ts" setup>
import { onMounted, onUnmounted, ref } from 'vue'

import introduce from '@/components/introduce/index.vue'

import { PROJECTS } from '@/assets/constant'
import { secondToDate, translateNumbers } from '@/utils/common'

type TIMER_STATUS = 'WORK' | 'REST'
type OPERATIONS_STATUS = 'PAUSE' | 'START' | 'RESET'

/** Variable */
let interval: any = null
let session = ref(25)
let space = ref(5)
let timerStatus = ref<TIMER_STATUS>('WORK')
let timer = ref('25:00')
let operationStatus = ref<OPERATIONS_STATUS | undefined>(void 0)
let step = ref(0)
let maxTime = ref(0)

/** Operation */
const changeNumber = (e: Event, type: 'session' | 'space') => {
  const value = (e.target as HTMLInputElement).value

  if (type === 'session') {
    session.value = +value
  } else {
    space.value = +value
  }

  handleClearInterval()
  handleReset()
}
const handleBtnOperation = (status: OPERATIONS_STATUS) => {
  operationStatus.value = status

  switch (status) {
    case 'START':
      handleDate()
      break
    case 'PAUSE':
      handleClearInterval()
      break
    case 'RESET':
      handleClearInterval()
      handleReset()
      break
    default:
      operationStatus.value = 'START'
      handleDate()
      break
  }
}
const handleDate = () => {
  const minutes = timerStatus.value === 'WORK' ? session.value : space.value

  if (!minutes) {
    handleClearInterval()
    return
  }

  maxTime.value = maxTime.value || minutes * 60

  interval = setInterval(() => {
    if (!maxTime.value) {
      handleClearInterval()

      operationStatus.value = 'RESET'
      timerStatus.value = timerStatus.value === 'WORK' ? 'REST' : 'WORK'
      operationStatus.value = 'START'

      handleDate()
      return
    }

    const { minutes: dMinutes, seconds } = secondToDate(maxTime.value, false)

    timer.value = `${translateNumbers(dMinutes)}:${translateNumbers(seconds)}`
    --maxTime.value
  }, 1000)
}
const handleClearInterval = () => {
  if (interval) {
    clearInterval(interval)

    interval = null
  }
}
const handleReset = () => {
  handleClearInterval()
  timerStatus.value = 'WORK'
  operationStatus.value = void 0
  maxTime.value = 0
  timer.value = `${translateNumbers(session.value)}:00`
}

/** Lifecycle Hooks */
onMounted(() => {
  handleClearInterval()
  handleReset()
})
onUnmounted(() => {
  handleClearInterval()
  handleReset()
})
</script>

<style lang="postcss" scoped></style>
