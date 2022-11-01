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
