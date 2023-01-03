<template>
  <introduce v-bind="PROJECTS.christmasLights">
    <div class="mx-auto w-80">
      <div class="mb-10 flex flex-col justify-center">
        <input
          type="number"
          name="rows"
          id="rows"
          min="1"
          max="7"
          placeholder="1 ~ 7"
          class="w-full mb-4"
          @change="changeRows"
        />

        <y-button @click="handleState" type="primary">on/off</y-button>
      </div>

      <ul class="mb-8 grid grid-rows-1 grid-cols-6 gap-5" v-for="row in rows" :key="row">
        <li v-for="col in 6" :key="row + col" class="w-10 h-10 rounded-full" :style="columnStyles(row, col)"></li>
      </ul>
    </div>
  </introduce>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'

import introduce from '@/components/introduce/index.vue'
import yButton from '@/components/custom/button/button.vue'

import { PROJECTS, PAUSED, RUNNING } from '@/utils/constant'

/** Variable */
const colors = ['#A78BFA', '#818CF8', '#60A5FA', '#34D399', '#FBBF24', '#F87171']

let rows = ref(1)
let state = ref(RUNNING)

/** Compute */
const columnStyles = computed(() => {
  return (row: number, col: number) => {
    return {
      '--duration': `${(row + col) / 2}s`,
      '--bg-color': colors[col - 1],
      '--state': state.value
    }
  }
})

/** Operation */
const changeRows = (event: Event) => {
  const target = event.target as HTMLInputElement

  rows.value = +target.value
}
const handleState = () => (state.value = state.value === RUNNING ? PAUSED : RUNNING)
</script>

<style lang="postcss" scoped>
ul li {
  background-color: var(--bg-color);
  animation: animationStyles var(--duration) infinite;
  animation-play-state: var(--state);
}

@keyframes animationStyles {
  0%,
  100% {
    box-shadow: 0 0 20px 5px var(--bg-color);
  }
  50% {
    box-shadow: none;
  }
}
</style>
