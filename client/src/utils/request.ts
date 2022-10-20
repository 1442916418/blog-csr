import axios from 'axios'
import { ElMessage } from 'element-plus'

const MSG = '开小差啦'

const service = axios.create({
  // @ts-ignore
  baseURL: process.env.VITE_APP_BASE,
  timeout: 10000
})

service.interceptors.request.use(
  (config: any) => {
    const token = window.localStorage.getItem('token')

    if (token) {
      config.headers['Authorization'] = 'token ' + token
    }
    return config
  },
  (error: any) => {
    return Promise.reject(error)
  }
)

service.interceptors.response.use(
  (response) => {
    const { status } = response

    if (status === 200) {
      const errors = response?.data?.errors

      if (errors) {
        ElMessage({
          message: errors.body || MSG,
          type: 'error',
          duration: 5000
        })
      }

      return Promise.resolve(response?.data ?? null)
    } else {
      ElMessage({
        message: response.statusText || MSG,
        type: 'error',
        duration: 5000
      })

      return Promise.reject('error')
    }
  },
  (error) => {
    ElMessage({
      message: error.message,
      type: 'error',
      duration: 5000
    })

    return Promise.reject(error)
  }
)

export default service
