import { Context, Next } from 'koa'
import { StatusCodes } from 'http-status-codes'
import { Repository } from 'typeorm'

import { AppDataSource } from '../dataSource'

import SecurityService, { Claims } from '../services/security-service'

import { User } from '../model/entity/user'

type UserRepository = Repository<User>

export default function AuthenticationMiddleware(
  {
    connection,
    securityService
  }: {
    connection: typeof AppDataSource
    securityService: SecurityService
  },
  authRequired: boolean = true
) {
  return async function (ctx: Context, next: Next) {
    const { authorization }: { authorization?: string } = ctx.header

    if (!authorization) {
      if (!authRequired) {
        return next()
      } else {
        ctx.throw(StatusCodes.UNAUTHORIZED, 'Unauthorized')
      }
    }

    const [tokenType, token]: string[] = authorization.split(' ')

    if (tokenType.toLowerCase() !== 'bearer' && tokenType.toLowerCase() !== 'token') {
      ctx.throw(StatusCodes.UNAUTHORIZED, 'Unauthorized')
    }

    let claims: Claims
    try {
      claims = securityService.verifyToken(token)
    } catch {
      ctx.throw(StatusCodes.UNAUTHORIZED, 'Unauthorized')
    }

    const userRepository: UserRepository = connection.getRepository(User)
    const user: User | null = await userRepository.findOne({ where: { id: claims.id } })

    if (!user) {
      ctx.throw(StatusCodes.UNAUTHORIZED, 'Unauthorized')
    }
    ctx.state.user = user
    ctx.state.token = token
    return next()
  }
}

export function OptionalAuthenticationMiddleware(params: any) {
  return AuthenticationMiddleware(params, false)
}
