import { HttpStatus } from '../enums/http-status.enum'

export const HttpStatusName = {
  [HttpStatus.BAD_REQUEST]: '参数校验不通过',
  [HttpStatus.INTERNAL_SERVER_ERROR]: '数据已存在',
  [HttpStatus.NOT_FOUND]: '无此内容',
  [HttpStatus.UNAUTHORIZED]: '尚未登录',
  [HttpStatus.FORBIDDEN]: '权限不足'
} as { [x: number]: string }
