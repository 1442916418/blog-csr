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
