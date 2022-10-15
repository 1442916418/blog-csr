import Router from '@koa/router'

const API = {}

const unprotectedRouter = new Router()

for (let k in API) {
  // @ts-ignore
  unprotectedRouter.post(k, API[k])
}

export { unprotectedRouter }
