<template>
  <div class="p-4 shadow rounded text-purple-800 bg-purple-400">
    <div class="font-bold text-base mb-2">{{ name }}</div>
    <div class="grid grid-cols-4 gap-2">
      <template v-for="(value, key) in list" :key="key">
        <div
          class="item py-4 flex flex-col justify-center items-center rounded-md bg-purple-200 overflow-hidden"
          :style="computeStyles(key, value.step)"
        >
          <span class="text-2xl z-10">{{ params[key] }}</span>
          <b class="z-10">{{ value.name }}</b>
        </div>
      </template>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, onUnmounted, reactive, computed } from 'vue'

import { secondToDate } from '@/utils/common'

const props = defineProps({
  name: {
    type: String,
    default: '',
    required: false
  },
  date: {
    type: String,
    required: true
  }
})

/** Variable */
const list = {
  days: { name: '天', step: 0 },
  hours: { name: '时', step: 0 },
  minutes: { name: '分', step: 0 },
  seconds: { name: '秒', step: 0 }
}
let interval: any = null
const params = reactive({
  days: 0,
  hours: 0,
  minutes: 0,
  seconds: 0
})

/** Compute */
const computeStyles = computed(() => {
  return (key: string, step: number) => {
    // @ts-ignore
    const curValue = params[key]

    return { '--num': curValue ? curValue * step + '%' : 0 }
  }
})

/** Operation */
const init = () => {
  if (!props.date) return

  interval = setInterval(() => {
    const then = new Date(props.date).getTime()
    const now = new Date().getTime()
    const date = secondToDate(then - now)

    !list.days.step && handleStep(date)

    Object.assign(params, date)
  }, 1000)
}
const handleStep = (date: typeof params) => {
  list.days.step = 100 / date.days
  list.hours.step = 100 / date.hours
  list.minutes.step = 100 / 59
  list.seconds.step = 100 / 59
}
const handleReset = () => {
  interval = null
  Object.assign(params, {
    days: '',
    hours: '',
    minutes: '',
    seconds: ''
  })

  list.days.step = 0
  list.hours.step = 0
  list.minutes.step = 0
  list.seconds.step = 0
}

/** Lifecycle Hooks */
onMounted(() => {
  init()
})

onUnmounted(() => {
  if (interval) {
    clearInterval(interval)
    handleReset()
  }
})
</script>

<style lang="postcss" scoped>
.item {
  position: relative;
}

.item::after {
  content: '';
  position: absolute;
  top: var(--num);
  right: 0;
  bottom: 0;
  left: 0;
  background-color: #ede9fe;
}
</style>
