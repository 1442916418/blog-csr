/**
 * api 请求接口返回状态
 * @description 需要在常量文件里声明对应的说明，9为前缀
 */
export enum ApiResponseStatus {
  OK = 9200,
  ERROR = 9400,
  SERVER_ERROR = 9401,
  SAVE_ERROR = 9402,
  DELETE_ERROR = 9403,
  PARAM_CHECK_ERROR = 9404,
  DATA_ALREADY_EXISTS = 9405,
  DATE_DELETED = 9406,
  NOT_DATA = 9407,
  CHILD_DATA = 9408,
  NO_AUTH = 9409
}
