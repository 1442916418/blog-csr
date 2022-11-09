import { Context, Next } from 'koa'
import { StatusCodes } from 'http-status-codes'
import logger from './logger/logger'

export default async function (ctx: Context, next: Next) {
  const startTime: number = Date.now()
  try {
    await next()
  } catch (ex) {
    if (ex.isJoi) {
      const body = ex.details[0].message

      ctx.status = StatusCodes.UNPROCESSABLE_ENTITY
      ctx.body = {
        errors: {
          body
        }
      }

      logger.error('Joi validates Error: ', ex.details)
    } else if (ex.status && ex.status !== StatusCodes.INTERNAL_SERVER_ERROR) {
      ctx.status = ex.status
      ctx.body = { message: ex.message }
    } else {
      logger.error('Unexpected Error: ', ex)
      ctx.status = StatusCodes.BAD_REQUEST
      ctx.body = { message: 'Invalid request' }
    }
  } finally {
    logger.info(`${ctx.request.method} ${ctx.request.path} ${ctx.status} ${Date.now() - startTime}ms`)
  }
}
