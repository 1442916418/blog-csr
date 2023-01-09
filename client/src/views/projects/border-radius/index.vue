<template>
  <introduce v-bind="PROJECTS.borderRadius">
    <div class="m-10 flex flex-col justify-center items-center">
      <div
        id="container"
        class="relative w-60 h-60 p-2 bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500"
        :style="styles"
      >
        <input type="range" min="0" max="100" step="1" class="w-full absolute -top-5 left-0" v-model="topValue" />
        <input
          type="range"
          min="0"
          max="100"
          step="1"
          class="vertical-range w-full absolute"
          style="top: 47%; right: -55%"
          v-model="rightValue"
        />
        <input
          type="range"
          min="0"
          max="100"
          step="1"
          class="bottom-range w-full absolute -bottom-5 left-0"
          v-model="bottomValue"
        />
        <input
          type="range"
          min="0"
          max="100"
          step="1"
          class="left-range w-full absolute"
          style="top: 47%; left: -55%"
          v-model="leftValue"
        />
      </div>

      <y-button class="mt-10" @click="handleCopy">复制代码</y-button>
    </div>
  </introduce>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'

import { Message } from '@/components/custom/message/message'
import yButton from '@/components/custom/button/button.vue'
import introduce from '@/components/introduce/index.vue'

import { PROJECTS } from '@/assets/constant'
import { copyToClipboard } from '@/utils/common'

/** Variable */
let topValue = ref(0)
let rightValue = ref(0)
let bottomValue = ref(0)
let leftValue = ref(0)

/** Compute */
const styles = computed(() => {
  return {
    'border-radius': `${topValue.value}% ${rightValue.value}% ${bottomValue.value}% ${leftValue.value}%`
  }
})

/** Operation */
const handleCopy = () => {
  const container = document.querySelector('#container')

  if (!container) return

  const style = window.getComputedStyle(container)
  const _ = (property: string) => style.getPropertyValue(property)

  const styles = ['width', 'height', 'background-image', 'border-radius'].map((v) => `${v}: ${_(v)}`)
  const values = `${styles.join(';\n')};`

  if (!values) return

  copyToClipboard(values)
    .then(() => {
      Message.success('复制成功')
    })
    .catch(() => {
      Message.danger('复制失败')
    })
}
</script>

<style lang="postcss" scoped>
.vertical-range {
  transform: rotate(90deg);
}
.left-range {
  transform: rotate(270deg);
}
.bottom-range {
  transform: rotateZ(180deg);
}
</style>
