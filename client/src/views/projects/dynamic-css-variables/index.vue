<template>
  <introduce v-bind="PROJECTS.dynamicCSSVariables">
    <div class="mx-auto w-80 flex flex-col justify-center">
      <div>
        <label for="id">ID</label>
        <input type="text" name="id" v-model="params.id" class="w-full" @keydown="changeParams" />
      </div>
      <div class="my-4">
        <label for="password">密码</label>
        <input type="text" name="password" v-model="params.password" class="w-full" @keydown="changeParams" />
      </div>
      <div class="text-center">
        <y-button @click="handleReset" class="mr-5">重 置</y-button>
        <y-button type="primary" @click="handleSubmit">登 录</y-button>
      </div>
    </div>
  </introduce>
</template>

<script lang="ts" setup>
import introduce from '@/components/introduce/index.vue'
import yButton from '@/components/custom/button/button.vue'

import { PROJECTS } from '@/assets/constant'
import { reactive } from 'vue'

/** Variable */
const DEFAULT_ID = 'user'
const DEFAULT_PS = '123456'
const DEFAULT_COLORS = {
  white: '#ffffff',
  red: '#FECACA',
  yellow: '#FDE68A'
}
const params = reactive({
  id: '',
  password: ''
})
const colors = reactive({
  bgColor: DEFAULT_COLORS.white
})

/** Operation */
const changeParams = () => {
  const isEmpty = (v: string) => v && /\s/g.test(v)

  colors.bgColor = isEmpty(params.id) || isEmpty(params.password) ? DEFAULT_COLORS.yellow : DEFAULT_COLORS.white
}
const handleReset = () => {
  colors.bgColor = DEFAULT_COLORS.white
}
const handleSubmit = () => {
  if (!params.id || !params.password) {
    colors.bgColor = DEFAULT_COLORS.yellow
  } else if (params.id !== DEFAULT_ID || params.password !== DEFAULT_PS) {
    colors.bgColor = DEFAULT_COLORS.red
  } else {
    handleReset()
  }
}
</script>

<style lang="postcss" scoped>
input {
  background-color: v-bind('colors.bgColor');
}
</style>
