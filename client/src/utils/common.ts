import type { RouteRecordRaw } from 'vue-router'

/**
 * 处理请求参数，去除假值字段
 * @param obj 请求参数
 * @returns 新参数
 */
export const handleRequestParam = (obj: any) => {
  if (JSON.stringify(obj) === '{}' || Array.isArray(obj)) {
    return obj
  }

  const res: any = {}

  for (const key in obj) {
    const value = obj[key]
    if (![0, null, undefined, ''].includes(value)) {
      res[key] = value
    }
  }

  return res
}

export const unsecuredCopyToClipboard = (text: string) => {
  const textArea = document.createElement('textarea')
  textArea.value = text

  document.body.appendChild(textArea)
  textArea.focus()
  textArea.select()

  const isCopy = document.execCommand('copy')

  return new Promise<void>((res, rej) => {
    document.body.removeChild(textArea)

    if (isCopy) {
      res()
    } else {
      rej()
    }
  })
}

/**
 * 复制
 * @param content 内容
 * @returns Promise
 */
export const copyToClipboard = (content: string) => {
  if (window.isSecureContext && navigator.clipboard) {
    return navigator.clipboard.writeText(content)
  } else {
    return unsecuredCopyToClipboard(content)
  }
}

/**
 * 小驼峰命名转中划线命名
 */
export const toMiddleDashNomenclature = (value: string) => {
  return value.replace(/[A-Z]/g, (v) => '-' + v.toLowerCase())
}

export const randomUUID = (start = 2, end = 8) => Math.random().toString(16).substring(start, end)

/**
 * 随机生成十六进制颜色
 */
export const randomColor = () => '#' + randomUUID()

/**
 * 秒数转日期
 * @param value 毫秒数
 * @returns 日期
 */
export const secondToDate = (value: number) => {
  value = value / 1000

  const days = Math.floor(value / 86400)
  const hours = Math.floor(value / 3600)
  const minutes = Math.floor((value / 60) % 60)
  const seconds = Math.floor(value % 60)

  return { days, hours, minutes, seconds }
}

/**
 * 保存文件
 * @param data 数据
 * @param fileName 文件名称
 * @param type 文件类型 {@link https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Common_types}
 */
export const saveDataFile = (data: string, fileName: string, type = 'text/json') => {
  const bw = getBrowser()

  if (!bw['edge'] || !bw['ie']) {
    const element = document.createElement('a')
    const uri = getDownloadUri(data, type)

    if (!uri) return

    element.href = uri
    element.download = fileName
    element.style.display = 'none'

    document.body.appendChild(element)

    element.click()

    document.body.removeChild(element)
  } else if ((bw['ie'] && +bw['ie'] >= 10) || bw['edge'] === 'edge') {
    // 为了使文件以 utf-8 的编码模式，同时也是解决中文乱码的问题
    const _utf = '\uFEFF'
    const blob = new Blob([_utf + data], { type })

    // @ts-ignore
    window.navigator.msSaveBlob(blob, fileName)
  }
}

/**
 * 生成 DataURI
 * @param data 数据
 * @param type 类型
 */
function getDownloadUri(data: string, type = 'text/json') {
  // 为了使文件以 utf-8 的编码模式，同时也是解决中文乱码的问题
  const _utf = '\uFEFF'

  if (window.Blob && window.URL && 'createObjectURL' in window.URL) {
    const blob = new Blob([_utf + data], {
      type
    })
    return URL.createObjectURL(blob)
  }

  return void 0
}

/**
 * 获取浏览器类型
 */
export const getBrowser = (): {
  edge?: string
  ie?: string
  firefox?: string
  chrome?: string
  opera?: string
  safari?: string
} => {
  const sys: { [x: string]: string } = {}
  const ua = navigator.userAgent.toLowerCase()
  const _ = (reg: string, v = ua) => {
    const res = v.match(reg)
    return res ? res[1] : ''
  }
  const browser = {
    ie: /rv:([\d.]+)\) like gecko/,
    ie1: /msie ([\d.]+)/,
    firefox: /firefox\/([\d.]+)/,
    chrome: /chrome\/([\d.]+)/,
    opera: /opera.([\d.]+)/,
    safari: /version\/([\d.]+).*safari/
  }

  if (ua.indexOf('edge') !== -1) {
    sys.edge = 'edge'
  }

  for (const key in browser) {
    // @ts-ignore
    const reg = browser[key]

    sys[key === 'ie1' ? 'ie' : key] = _(reg)
  }

  return sys
}

/**
 * 处理子路由
 */
export const handleChildrenRoute = ({
  files,
  exclude,
  prefix
}: {
  files: Record<string, () => Promise<unknown>>
  exclude?: string[]
  prefix?: string
}) => {
  const result: RouteRecordRaw[] = []

  if (!files) return result

  const excludeList = exclude || []
  const getPath = (name: string) => (prefix ? `${prefix}/${name}` : name)

  for (const [key, value] of Object.entries(files)) {
    const splitName = key.split('/')
    const fileName = splitName.slice(-2, -1)[0]

    if (!excludeList.includes(fileName)) {
      result.push({
        path: getPath(fileName),
        name: fileName,
        meta: {
          title: fileName,
          keepAlive: false
        },
        component: value
      })
    }
  }

  return result
}

/**
 * CSV 转 JSON(单层转换)
 * @param data CSV 数据
 * @returns 数组 JSON 数据
 */
export const CSVToJSON = (data: string) => {
  const result: { [x: string]: string }[] = []

  if (!data) return result

  try {
    const rows = data.split('\n')
    const replaceStr = (v: string) => v.replace(/"|\r/g, '')

    let keys: string[] = []

    rows.forEach((row, i) => {
      const columns = replaceStr(row).split(',')

      if (i) {
        const item: { [x: string]: string } = {}

        keys.forEach((key, j) => (item[key] = columns[j]))

        result.push(item)
      } else {
        keys = columns
      }
    })
  } catch (error) {
    console.log('🚀 ~ file: common.ts:238 ~ CSVToJSON ~ error', error)
  }

  return result
}

/**
 * JSON 转 CSV(单层转换)
 * @param data JSON 数据
 * @returns CSV 数据
 */
export const JSONToCSV = (data: string) => {
  let result = ''

  if (!data) return result

  try {
    const items = JSON.parse(data)

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

    result = (itemsIsArray ? [headerString, ...rowItems] : [headerString, rowItems]).join('\r\n')
  } catch (error) {
    console.log('🚀 ~ file: common.ts:269 ~ JSONToCSV ~ error', error)
  }

  return result
}
