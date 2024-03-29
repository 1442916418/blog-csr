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
          placeholder="请选择/输入 CSV 数据"
          v-model="csvValue"
        ></textarea>
        <input
          type="file"
          name="CSVFile"
          id="CSVFile"
          accept=".csv"
          @change="changeFile($event, 'csv')"
          @focus="handleFocus('CSVFile')"
        />
        <y-button type="primary" size="small" class="my-4" :disabled="!csvValue" @click="handleDownload('csv')"
          >下 载</y-button
        >
        <y-button size="small" @click="handleResetCsv" :disabled="!csvValue">重 置</y-button>
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
          placeholder="请选择/输入 JSON 数据"
          v-model="jsonValue"
        ></textarea>
        <input
          type="file"
          name="JSONFile"
          id="JSONFile"
          accept=".json"
          @change="changeFile($event, 'json')"
          @focus="handleFocus('JSONFile')"
        />
        <y-button type="primary" size="small" class="my-4" :disabled="!jsonValue" @click="handleDownload('json')"
          >下 载</y-button
        >
        <y-button size="small" @click="handleResetJson" :disabled="!jsonValue">重 置</y-button>
      </div>
    </div>
  </introduce>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

import introduce from '@/components/introduce/index.vue'
import yButton from '@/components/custom/button/button.vue'

import { PROJECTS } from '@/assets/constant'
import { saveDataFile, CSVToJSON, JSONToCSV } from '@/utils/common'

type types = 'csv' | 'json'

/** Variable */
let csvFile = ref<string | undefined>(void 0)
let jsonFile = ref<{} | {}[] | undefined>(void 0)
let csvValue = ref('')
let jsonValue = ref('')

/** Operation */
const handleDownload = (type: types) => {
  if (type === 'csv' && csvValue.value) {
    saveDataFile(csvValue.value, '下载', 'text/csv')
  }
  if (type === 'json' && jsonValue.value) {
    saveDataFile(jsonValue.value, '下载', 'application/json')
  }
}
const handleFocus = (id: string) => {
  const input = document.getElementById(id) as HTMLInputElement

  if (input) {
    input.value = ''
  }
}
const handleToJSON = () => {
  if (!csvValue.value) return

  const result = CSVToJSON(csvValue.value)

  jsonFile.value = result && result.length ? result : void 0
  jsonValue.value = result && result.length ? JSON.stringify(result, null, 2) : ''

  !result && handleResetJson()
}
const handleToCSV = () => {
  if (!jsonValue.value) return

  const result = JSONToCSV(jsonValue.value)

  csvFile.value = result || void 0
  csvValue.value = result || ''

  !result && handleResetCsv()
}
const changeFile = (e: Event, type: types) => {
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
  handleResetCsv()
  handleResetJson()
}
const handleResetCsv = () => {
  csvFile.value = void 0
  csvValue.value = ''
}
const handleResetJson = () => {
  jsonFile.value = void 0
  jsonValue.value = ''
}
</script>
