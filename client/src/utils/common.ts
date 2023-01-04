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
