import Koa from 'koa'
import cors from '@koa/cors'
import bodyParser from 'koa-bodyparser'
import helmet from 'koa-helmet'

import 'reflect-metadata'

import { createContainer, AwilixContainer, asValue } from 'awilix'
import { scopePerRequest, loadControllers } from 'awilix-koa'

import SecurityService from './services/security-service'
import errorMiddleware from './middleware/error-middleware'
import { AppDataSource } from './dataSource'
import logger from './middleware/logger/logger'

const config = require('../env/index')

const isDev = process.env.NODE_ENV === 'development'

const init = async () => {
  const connect = await AppDataSource.initialize().catch((err: string) => {
    logger.error(`TypeORM initialize error: ${err}`)
  })

  if (connect) {
    const app = new Koa()
    const securityService: SecurityService = new SecurityService()

    const container: AwilixContainer = createContainer().register({
      securityService: asValue(securityService),
      connection: asValue(AppDataSource)
    })

    app
      .use(cors())
      .use(bodyParser())
      .use(helmet())
      .use(scopePerRequest(container))
      .use(errorMiddleware)
      .use(loadControllers('controller/*.{ts,js}', { cwd: __dirname }))

    app.listen(config.port)
  }
}

isDev && init()

export { init }
