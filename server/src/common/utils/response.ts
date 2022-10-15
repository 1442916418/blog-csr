import { ApiResponseStatusName, HttpStatusName } from '../constants'

/**
 * 获取返回接口数据
 * @param code code
 * @param data 数据
 * @returns 整合后的数据
 */
export const getResponseResult = (
  code: number,
  data?: ResponseResultData
): { code: number; message: string; data: ResponseResultData } => {
  return {
    code,
    message: ApiResponseStatusName[code] || HttpStatusName[code],
    data: data || { records: false }
  }
}

/**
 * 获取返回接口数据
 * @description 抛出错误时使用
 * @param code code
 * @param data 数据
 * @returns 整合后的数据
 */
export const getErrorResponseResult = (
  code: number,
  mgs?: string,
  data?: ResponseResultData
): { code: number; message: string; data: ResponseResultData } => {
  return {
    code,
    message: ApiResponseStatusName[code] || HttpStatusName[code],
    data: data || { records: false }
  }
}

/**
 * 请求结果返回数据接口
 */
interface ResponseResultData {
  /**
   * 数据
   */
  records?: any
  /**
   * 分页总数
   */
  total?: number
}
