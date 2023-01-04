<template>
  <introduce v-bind="PROJECTS.jsonCsv">
    <div class="mx-auto w-3/4 flex justify-between space-x-2">
      <div class="flex flex-col">
        <textarea
          name="csv"
          id="csv"
          class="w-full mb-4"
          cols="30"
          rows="10"
          placeholder="请选择 csv 文件"
          v-model="csvValue"
        ></textarea>
        <input type="file" name="file" id="file" accept=".csv" @change="changeFile($event, 'csv')" />
      </div>
      <div class="flex flex-col justify-center items-center">
        <y-button type="primary" size="small" class="mb-4" @click="handleToJSON" :disabled="!csvValue"
          >&gt; JSON</y-button
        >
        <y-button type="primary" size="small" @click="handleToCSV" :disabled="!jsonValue">&#60; CSV</y-button>
      </div>
      <div class="flex flex-col">
        <textarea
          name="json"
          id="json"
          class="w-full mb-4"
          cols="30"
          rows="10"
          placeholder="请选择 json 文件"
          v-model="jsonValue"
        ></textarea>
        <input type="file" name="file" id="file" accept=".json" @change="changeFile($event, 'json')" />
      </div>
    </div>
  </introduce>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

import introduce from '@/components/introduce/index.vue'
import yButton from '@/components/custom/button/button.vue'

import { PROJECTS } from '@/utils/constant'

/** Variable */
let csvFile = ref<string | undefined>(void 0)
let jsonFile = ref<{} | {}[] | undefined>(void 0)
let csvValue = ref('')
let jsonValue = ref('')

/** Operation */
const handleToJSON = () => {
  if (!csvValue.value) return

  const result: { [x: string]: string }[] = []
  const rows = csvValue.value.split('\n')
  console.log('🚀 ~ file: index.vue:57 ~ handleToJSON ~ value', rows)

  let keys: string[] = []

  rows.forEach((row, i) => {
    const columns = row.split(',')

    if (!i) {
      keys = columns
    }

    columns.forEach((col, j) => {
      if (j) {
        const val: { [x: string]: string } = {}

        keys.forEach((key) => {
          val[key] = col
        })

        result.push(val)
      }
    })
  })

  console.log(keys, result)
}
const handleToCSV = () => {}
const changeFile = (e: Event, type: 'csv' | 'json') => {
  const files = (e.target as HTMLInputElement).files

  if (!files?.length) return

  const reader = new FileReader()

  reader.readAsText(files[0])

  reader.onload = function (res) {
    const result = res.target?.result as string

    if (result) {
      if (type === 'json') {
        jsonFile.value = JSON.parse(result)
        jsonValue.value = result
      } else {
        csvFile.value = result
        csvValue.value = result
      }
    } else {
      handleReset()
    }
  }

  reader.onabort = function () {
    handleReset()
  }

  reader.onerror = function () {
    handleReset()
  }
}
const handleReset = () => {
  csvFile.value = void 0
  jsonFile.value = void 0
}
</script>
