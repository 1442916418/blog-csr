<template>
  <introduce v-bind="PROJECTS.keyboard">
    <div class="w-20 h-20 bg-slate-400 flex justify-start items-center">
      <span>1</span>
    </div>
    <div class="container p-5 flex justify-between space-x-2 bg-gray-200">
      <div class="left space-y-4">
        <div v-for="(row, i) in leftKeys" :key="i" class="row">
          <div
            v-for="column in row"
            :key="column.code"
            class="item flex justify-center items-center text-gray-400 font-bold"
            :class="itemClass(column.code)"
          >
            {{ column.key }}
          </div>
        </div>
      </div>
    </div>
  </introduce>
</template>

<script lang="ts" setup>
import { onMounted, reactive, computed, onUnmounted } from 'vue'

import introduce from '@/components/introduce/index.vue'

import { PROJECTS } from '@/assets/constant'
import { KEYBOARD_OBJ } from '@/assets/constant/keys'

/** Variable */
const leftKeys = KEYBOARD_OBJ.left
const centerKeys = KEYBOARD_OBJ.center
const rightKeys = KEYBOARD_OBJ.right
const keyboardCodes = reactive(new Set())

/** Compute */
const itemClass = computed(() => {
  return (code: string) => {
    return [keyboardCodes.has(code) ? ' item-active ' : '']
  }
})

/** Operation */
const handleKeydown = (e: KeyboardEvent) => {
  e.preventDefault()

  keyboardCodes.add(e.code)
}
const handleKeyUp = (e: KeyboardEvent) => {
  e.preventDefault()

  keyboardCodes.delete(e.code)
}
const handleTest = () => {
  const _ = (v: any) => {
    return v.map((c: any[]) => {
      c.forEach((k: { [x: string]: any; key: any }) => {
        k['classNames'] = 'flex justify-center items-center '
      })
      return c
    })
  }

  let result = {
    left: _(leftKeys),
    center: _(centerKeys),
    right: _(rightKeys)
  }

  window.sessionStorage.setItem('json', JSON.stringify(result))
}

/** Lifecycle Hooks */
onMounted(() => {
  handleTest()
  keyboardCodes.clear()

  document.addEventListener('keydown', handleKeydown)
  document.addEventListener('keyup', handleKeyUp)
})
onUnmounted(() => {
  keyboardCodes.clear()

  document.removeEventListener('keydown', handleKeydown)
  document.removeEventListener('keyup', handleKeyUp)
})
</script>

<style scoped>
.left .row {
  display: grid;
  grid-template-columns: repeat(15, auto);
  column-gap: 20px;
}

.item {
  padding: 4px;
  width: 48px;
  height: 48px;
  border-radius: 4px;
  background: linear-gradient(145deg, #ced0d4, #f5f7fb);
  box-shadow: 5px 5px 9px #dcdee2, -5px -5px 9px #eef0f4;
}

.item-active {
  background: #e5e7eb;
  box-shadow: inset 5px 5px 9px #dcdee2, inset -5px -5px 9px #eef0f4;
}
</style>
