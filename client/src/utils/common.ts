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

/**
 * 随机生成十六进制颜色
 */
export const randomColor = () => '#' + Math.random().toString(16).substring(2, 8)

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
