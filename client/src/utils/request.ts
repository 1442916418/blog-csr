import axios from 'axios'
import { ElMessage } from 'element-plus'

import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'

import { MESSAGES } from '@/utils/constant'

/**
 * 请求类
 * @description 用来自定义传递配置来创建实例
 */
export class Request {
  /** axios 实例 */
  instance: AxiosInstance
  /** 基础配置，url 和超时时间 */
  baseConfig: AxiosRequestConfig = {
    baseURL: `${import.meta.env.VITE_APP_BASE_URL}${import.meta.env.VITE_APP_BASE_API_PATH}`,
    timeout: 60000
  }

  constructor(config: AxiosRequestConfig) {
    // 使用 axios.create 创建 axios 实例
    this.instance = axios.create(Object.assign(this.baseConfig, config))

    this.instance.interceptors.request.use(
      (config: AxiosRequestConfig) => {
        const token = window.localStorage.getItem('token')

        if (token) {
          config.headers!.Authorization = 'token ' + token
        }

        return config
      },
      (err: any) => {
        ElMessage.error({ message: '请求错误' })
        return Promise.reject(err)
      }
    )

    this.instance.interceptors.response.use(
      (res: AxiosResponse) => {
        if (res?.data?.errors) {
          const errorsBody = res.data.errors.body
          const message = errorsBody instanceof Array ? errorsBody.toString() : errorsBody

          ElMessage.error({ message })
        }
        console.log('🚀 ~ file: request.ts ~ line 52 ~ Request ~ constructor ~ res', res)
        return res
      },
      (err: any) => {
        const { response } = err
        const status = response?.status ?? 400
        const message = MESSAGES[status] || response?.data?.message

        ElMessage.error({ message })

        return Promise.reject(response)
      }
    )
  }

  public request(config: AxiosRequestConfig): Promise<AxiosResponse> {
    return this.instance.request(config)
  }

  public get<T = any>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.instance.get(url, config)
  }

  public post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.instance.post(url, data, config)
  }

  public put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.instance.put(url, data, config)
  }

  public delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> {
    return this.instance.delete(url, config)
  }
}

export default new Request({})
