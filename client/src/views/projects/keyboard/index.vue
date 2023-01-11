<template>
  <introduce v-bind="PROJECTS.keyboard">
    <div class="keyboard-container">
      <div class="space-y-4">
        <keyboard-top-item-component :list="keyboardObj.top" :actives="actives" />

        <keyboard-item-component :list="keyboardObj.left" :actives="actives" />
      </div>

      <keyboard-item-component :list="keyboardObj.center" :actives="actives" />

      <keyboard-item-component :list="keyboardObj.right" :actives="actives" />
    </div>
  </introduce>
</template>

<script lang="ts" setup>
import { onMounted, reactive, computed, onUnmounted } from 'vue'

import introduce from '@/components/introduce/index.vue'
import keyboardItemComponent from './components/item.vue'
import keyboardTopItemComponent from './components/top-item.vue'

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

/** Lifecycle Hooks */
onMounted(() => {
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
    @apply mx-auto p-5 bg-gray-200;
    width: 1675px;
    display: grid;
    grid-template-columns: repeat(3, auto);
    column-gap: 40px;
  }

  .keyboard-operation {
    display: grid;
    grid-template-columns: repeat(4, auto);
    justify-content: end;
  }
}
</style>
