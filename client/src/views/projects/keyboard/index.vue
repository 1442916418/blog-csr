<template>
  <introduce v-bind="PROJECTS.keyboard">
    <div class="keyboard-container grid grid-cols-3 gap-5">
      <keyboard-item-component :list="keyboardObj.left" :actives="actives" />

      <keyboard-item-component :list="keyboardObj.center" :actives="actives" />

      <keyboard-item-component :list="keyboardObj.right" :actives="actives" />
    </div>
  </introduce>
</template>

<script lang="ts" setup>
import { onMounted, reactive, computed, onUnmounted } from 'vue'

import introduce from '@/components/introduce/index.vue'
import keyboardItemComponent from './item.vue'

import { PROJECTS } from '@/assets/constant'
import { KEYBOARD_OBJ } from '@/assets/constant/keys'

/** Variable */
const keyboardObj = KEYBOARD_OBJ
const keyboardCodes = reactive(new Set<string>())

/** Compute */
const actives = computed(() => [...keyboardCodes.values()])

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
        k.value = k.value.reverse()
      })
      return c
    })
  }

  let result = {
    left: _(keyboardObj.left),
    center: _(keyboardObj.center),
    right: _(keyboardObj.right)
  }

  window.sessionStorage.setItem('json', JSON.stringify(result))
}

/** Lifecycle Hooks */
onMounted(() => {
  // handleTest()
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

<style lang="postcss" scoped>
@tailwind components;

@layer components {
  .keyboard-container {
    @apply p-5 flex justify-between space-x-2 bg-gray-200;
  }
}
</style>
