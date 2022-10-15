import { HttpStatus } from '../enums'
import { BaseException } from './base.exception'

export class NotFoundException extends BaseException {
  status = HttpStatus.NOT_FOUND

  constructor(msg?: string) {
    super()
    this.message = msg || '无此内容'
  }
}

export class UnauthorizedException extends BaseException {
  status = HttpStatus.UNAUTHORIZED

  constructor(msg?: string) {
    super()
    this.message = msg || '尚未登录'
  }
}

export class ForbiddenException extends BaseException {
  status = HttpStatus.FORBIDDEN

  constructor(msg?: string) {
    super()
    this.message = msg || '权限不足'
  }
}
