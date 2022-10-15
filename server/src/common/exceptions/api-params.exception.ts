import { HttpStatus } from '../enums'
import { BaseException } from './base.exception'

export class ParamCheckErrorException extends BaseException {
  status = HttpStatus.BAD_REQUEST

  constructor(msg?: string) {
    super()
    this.message = msg || '参数校验不通过'
  }
}

export class DataAlreadyExistsException extends BaseException {
  status = HttpStatus.INTERNAL_SERVER_ERROR

  constructor(msg?: string) {
    super()
    this.message = msg || '数据已存在'
  }
}

export class DataDeletedException extends BaseException {
  status = HttpStatus.INTERNAL_SERVER_ERROR

  constructor(msg?: string) {
    super()
    this.message = msg || '数据已删除'
  }
}

export class NoDataException extends BaseException {
  status = HttpStatus.INTERNAL_SERVER_ERROR

  constructor(msg?: string) {
    super()
    this.message = msg || '无数据'
  }
}
