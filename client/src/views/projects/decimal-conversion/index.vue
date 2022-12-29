<template>
  <div class="decimal-conversion">
    <introduce v-bind="PROJECTS.decimalConversion">
      <div class="flex items-center">
        <div>
          <input
            v-for="(value, i) in values"
            :key="i"
            class="w-10 m-2"
            type="text"
            v-model.number="values[i]"
            @input="changeValue(i)"
          />
        </div>

        <span class="mx-10">转换为:</span>

        <div>{{ computedValue }}</div>
      </div>
    </introduce>
  </div>
</template>

<script lang="ts" setup>
import { computed, reactive } from 'vue'

import introduce from '@/components/introduce/index.vue'

import { PROJECTS } from '@/utils/constant'

/** Variable */
let values = reactive<number[]>([1, 1, 1, 1, 1, 1, 1, 1])

/** Compute */
const computedValue = computed(() => parseInt(values.join(''), 2))

/** Operation */
const changeValue = (index: number) => {
  let value = +values[index]

  if (![0, 1].includes(value)) {
    values[index] = 0
  }
}
</script>

<style lang="scss" scoped></style>
