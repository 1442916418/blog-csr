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
          placeholder="请选择 json 文件"
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

import { PROJECTS } from '@/utils/constant'
import { saveDataFile } from '@/utils/common'

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

  try {
    const result: { [x: string]: string }[] = []
    const rows = csvValue.value.split('\n')
    const replaceStr = (v: string) => v.replace(/"|\r/g, '')

    let keys: string[] = []

    rows.forEach((row, i) => {
      const columns = replaceStr(row).split(',')

      if (i) {
        columns.forEach((col, j) => {
          if (j) {
            const val: { [x: string]: string } = {}

            keys.forEach((key) => {
              val[key] = col
            })

            result.push(val)
          }
        })
      } else {
        keys = columns
      }
    })

    jsonFile.value = result.length ? result : void 0
    jsonValue.value = result.length ? JSON.stringify(result, null, 2) : ''
  } catch (error) {
    console.log('🚀 ~ file: index.vue:127 ~ handleToJSON ~ error', error)
    handleResetJson()
  }
}
const handleToCSV = () => {
  if (!jsonValue.value) return

  try {
    const items = JSON.parse(jsonValue.value)

    let rowItems = ''
    const itemsIsArray = Array.isArray(items)
    const header = Object.keys(itemsIsArray ? items[0] : items)
    const headerString = header.join(',')
    const replacer = (key: any, value: any) => value ?? ''

    if (itemsIsArray) {
      // @ts-ignore
      rowItems = items.map((row) => header.map((fieldName) => JSON.stringify(row[fieldName], replacer)).join(','))
    } else {
      // @ts-ignore
      rowItems = header.map((fieldName) => JSON.stringify(items[fieldName], replacer)).join(',')
    }

    const result = (itemsIsArray ? [headerString, ...rowItems] : [headerString, rowItems]).join('\r\n')

    csvFile.value = result || void 0
    csvValue.value = result || ''
  } catch (error) {
    console.log('🚀 ~ file: index.vue:106 ~ handleToCSV ~ error', error)
    handleResetCsv()
  }
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
