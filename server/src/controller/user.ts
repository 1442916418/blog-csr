import { route, GET, POST, before, inject, PUT } from 'awilix-koa'
import { StatusCodes } from 'http-status-codes'
import { Context } from 'koa'
import joi from 'joi'

import { UserRepository } from '../repositories/user'
import { InvitationCodeRepository } from '../repositories/invitation-code'

import { User } from '../model/entity/user'

import SecurityService from '../services/security-service'
import AuthenticationMiddleware from '../middleware/authentication-middleware'

import { CParams } from '../types'

@route('/api')
export default class UserController {
  private _securityService: SecurityService
  private _userRepository: typeof UserRepository
  private _invitationCode: typeof InvitationCodeRepository

  // 注入依赖
  constructor({ securityService }: CParams) {
    this._securityService = securityService
    this._userRepository = UserRepository
    this._invitationCode = InvitationCodeRepository
  }

  @route('/users')
  @POST()
  async register(ctx: Context) {
    const body = ctx.request.body

    joi.assert(
      body,
      joi.object({
        user: joi.object({
          username: joi.string().min(1).max(30).required(),
          email: joi.string().email().required(),
          password: joi.string().min(5).max(30).required(),
          invitationCode: joi.string().guid().required(),
          bio: joi.string().max(1000),
          image: joi.string().max(1000)
        })
      })
    )

    const invitationCode = await this._invitationCode.findOne({ where: { code: body.user.invitationCode } })

    if (!invitationCode) {
      ctx.status = StatusCodes.OK
      ctx.body = { errors: { body: '邀请码无效' } }
      return
    }

    if (invitationCode.isUse) {
      ctx.status = StatusCodes.OK
      ctx.body = { errors: { body: '邀请码已使用' } }
      return
    }

    const user: User = new User()
    Object.assign(user, body.user, { invitationCode })

    SecurityService.hashPassword(user)

    await this._userRepository.save(user)

    invitationCode.isUse = true

    await this._invitationCode.update(invitationCode.id, invitationCode)

    const token: string = this._securityService.generateToken(user)

    ctx.body = { user: user.toUserJSON(token) }
    ctx.status = StatusCodes.CREATED
  }

  @route('/users/login')
  @POST()
  async login(ctx: Context) {
    joi.assert(
      ctx.request.body,
      joi.object({
        user: joi.object({
          email: joi.string().email().required(),
          password: joi.string().min(5).max(30).required()
        })
      })
    )

    const { email, password }: { email: string; password: string } = ctx.request.body.user
    const user: User | null = await this._userRepository.findOne({ where: { email }, relations: ['invitationCode'] })

    if (!user || !user.invitationCode) {
      ctx.throw(StatusCodes.UNAUTHORIZED, 'Unauthorized')
    }

    if (!SecurityService.verifyHash(password, user.password)) {
      ctx.throw(StatusCodes.UNAUTHORIZED, 'Unauthorized')
    }

    const token: string = this._securityService.generateToken(user)

    ctx.body = { user: user.toUserJSON(token) }
    ctx.status = StatusCodes.OK
  }

  @route('/user')
  @GET()
  @before([inject(AuthenticationMiddleware)])
  async getCurrentUser(ctx: Context) {
    ctx.body = { user: ctx.state.user.toUserJSON(ctx.state.token) }
    ctx.status = StatusCodes.OK
  }

  @route('/user')
  @PUT()
  @before([inject(AuthenticationMiddleware)])
  async updateUser(ctx: Context) {
    const { body } = ctx.request
    const isPassword = body.user?.password ?? void 0
    const isBio = body.user?.bio ?? void 0
    const isImage = body.user?.image ?? void 0

    let userObject = joi.object({
      username: joi.string().min(1).max(30),
      email: joi.string().email()
    })

    if (isPassword) {
      userObject = userObject.append({
        password: joi.string().min(5).max(30)
      })
    }
    if (isBio) {
      userObject = userObject.append({
        bio: joi.string().max(1000)
      })
    }
    if (isImage) {
      userObject = userObject.append({
        image: joi.string().max(1000)
      })
    }

    joi.assert(
      body,
      joi.object({
        user: userObject
      })
    )

    const user: User = ctx.state.user
    Object.assign(user, body.user)

    if (isPassword) {
      SecurityService.hashPassword(user)
    }

    await this._userRepository.update(user.id, user)

    ctx.body = { user: user.toUserJSON(ctx.state.token) }
    ctx.status = StatusCodes.OK
  }
}
