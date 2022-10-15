import Koa from 'koa'
import cors from '@koa/cors'
import bodyParser from 'koa-bodyparser'

import 'reflect-metadata'

import { AppDataSource } from './dataSource'
import { unprotectedRouter } from './routes'
import logger from './middleware/logger/logger'
import { getErrorResponseResult, getResponseResult } from './common/utils'
import { HttpStatus } from './common/enums'

const config = require('../env/index')

const isDev = process.env.NODE_ENV === 'development'

// TODO: 错误抛出分级
const init = async () => {
  AppDataSource.initialize()
    .then(() => {
      // 初始化 Koa 应用实例
      const app = new Koa()

      // 注册中间件
      app.use(cors())
      app.use(bodyParser())

      app.use(async (ctx, next) => {
        try {
          logger.info(`next() before: ${JSON.stringify(ctx)}`)

          await next()

          if (ctx.status === 404) {
            logger.error(`next() ctx.status 404: ${JSON.stringify(ctx)}`)

            ctx.status = HttpStatus.OK
            ctx.body = getResponseResult(HttpStatus.NOT_FOUND)
          }
        } catch (err) {
          ctx.status = HttpStatus.OK
          ctx.body = getErrorResponseResult(err.status, err.message)

          logger.info(`next() after: ${JSON.stringify(ctx)}`)
        }
      })

      app.use(unprotectedRouter.routes()).use(unprotectedRouter.allowedMethods())

      // 运行服务器
      app.listen(config.port)
    })
    .catch((err: string) => {
      logger.error(`TypeORM initialize error: ${err}`)
    })
}

isDev && init()

export { init }
