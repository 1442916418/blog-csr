import { ApiResponseStatus } from '../enums/api-response-status.enum'

export const ApiResponseStatusName = {
  [ApiResponseStatus.OK]: '成功',
  [ApiResponseStatus.ERROR]: '错误',
  [ApiResponseStatus.SERVER_ERROR]: '服务器错误',
  [ApiResponseStatus.SAVE_ERROR]: '保存错误',
  [ApiResponseStatus.DELETE_ERROR]: '删除错误',
  [ApiResponseStatus.PARAM_CHECK_ERROR]: '参数校验不通过',
  [ApiResponseStatus.DATA_ALREADY_EXISTS]: '数据已存在',
  [ApiResponseStatus.DATE_DELETED]: '数据已删除',
  [ApiResponseStatus.NOT_DATA]: '无数据',
  [ApiResponseStatus.CHILD_DATA]: '子级有数据',
  [ApiResponseStatus.NO_AUTH]: '无权限'
} as { [x: number]: string }
