<template>
  <introduce v-bind="PROJECTS.colorCycle">
    <div class="mx-auto w-3/4 flex flex-col justify-center">
      <div class="container w-full h-20" :style="styles"></div>

      <y-button class="my-5" @click="handleState" type="primary">{{ stateName }}</y-button>

      <div class="flex flex-col space-y-4">
        <div
          class="flex items-center space-x-2"
          v-for="(item, i) in colors"
          :key="item + i"
          :style="`background-color: ${item}`"
        >
          <colors-component :color="item" :disabled="isDisabled" @change="changeColor($event, i)"></colors-component>

          <div class="w-16">
            <y-button class="mr-2" size="small" circle :disabled="isDisabled" v-show="i > 5" @click="handleClose(i)"
              ><i class="iconfont icon-close"></i
            ></y-button>
            <y-button
              size="small"
              type="primary"
              circle
              :disabled="isDisabled"
              v-show="i === colors.length - 1"
              @click="handleAdd"
              ><i class="iconfont icon-add"></i
            ></y-button>
          </div>
        </div>
      </div>
    </div>
  </introduce>
</template>

<script lang="ts" setup>
import { computed, onMounted, reactive, ref } from 'vue'

import introduce from '@/components/introduce/index.vue'
import yButton from '@/components/custom/button/button.vue'
import colorsComponent from './color.vue'

import { PROJECTS, PAUSED, RUNNING } from '@/utils/constant'
import { randomColor } from '@/utils/common'

/** Variable */
const baseName = 'colors'

let colors = ref(['#9CA3AF', '#F87171', '#FBBF24', '#34D399', '#60A5FA', '#818CF8'])
const params = reactive({
  name: '',
  duration: '0s',
  delay: '0s',
  state: RUNNING
})

/** Compute */
const stateName = computed(() => (params.state === RUNNING ? '停止' : '开始'))
const isDisabled = computed(() => params.state === RUNNING)
const styles = computed(() => {
  return {
    '--animation-name': params.name,
    '--animation-duration': params.duration,
    '--animation-delay': params.delay,
    '--animation-play-state': params.state
  }
})

/** Operation */
const init = () => {
  handleAnimationStyles()
}
const handleAnimationStyles = () => {
  const keyframesName = baseName + new Date().getTime()

  const styleSheet = document.styleSheets[document.styleSheets.length - 1]
  const len = colors.value.length

  const speed = Math.floor(100 / len)
  const keyframesStr = `${keyframesName} { ${colors.value
    .map((v, i) => {
      return `${!i ? 0 : i * speed}%{background-color: ${v};}`
    })
    .join(' ')}}`
  const keyframes = `@keyframes ${keyframesStr}`
  const keyframesWebkit = `@-webkit-keyframes ${keyframesStr}`

  styleSheet.insertRule(keyframes, styleSheet.cssRules.length)
  styleSheet.insertRule(keyframesWebkit, styleSheet.cssRules.length)

  params.name = keyframesName
  params.duration = len + 's'
}
const handleState = () => (params.state = params.state === RUNNING ? PAUSED : RUNNING)
const handleClose = (index: number) => {
  colors.value.splice(index, 1)
  handleAnimationStyles()
}
const handleAdd = () => {
  colors.value.push(randomColor())
  handleAnimationStyles()
}
const changeColor = (color: string, i: number) => {
  colors.value[i] = color
  handleAnimationStyles()
}

/** Lifecycle Hooks */
onMounted(() => {
  init()
})
</script>

<style lang="postcss">
.container {
  background-color: rgb(255, 255, 255);
  animation-name: var(--animation-name);
  animation-duration: var(--animation-duration);
  animation-delay: var(--animation-delay);
  animation-play-state: var(--animation-play-state);
  animation-iteration-count: infinite;
}
</style>
