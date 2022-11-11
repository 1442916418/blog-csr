import { route, GET, POST } from 'awilix-koa'
import { StatusCodes } from 'http-status-codes'
import { Context } from 'koa'
import joi from 'joi'

import { InvitationCodeRepository } from '../repositories/invitation-code'

import { InvitationCode } from '../model/entity/invitation-code'

@route('/api/invitationCodes')
export default class InvitationCodeController {
  private _invitationCodeRepository: typeof InvitationCodeRepository

  // 可以在此处注入注册到容器的任何依赖项
  constructor() {
    this._invitationCodeRepository = InvitationCodeRepository
  }

  @route('')
  @GET()
  async getInvitationCodes(ctx: Context) {
    const codes: InvitationCode[] = await this._invitationCodeRepository.find()

    ctx.body = { codes: codes.map((tag: InvitationCode) => tag.toJSON()) }
    ctx.status = StatusCodes.OK
  }

  @route('')
  @POST()
  async createInvitationCode(ctx: Context) {
    const body = ctx.request.body

    joi.assert(
      body,
      joi.object({
        invitationCode: joi.object({
          code: joi.string().guid().required()
        })
      })
    )

    const invitationCode: InvitationCode = new InvitationCode()
    invitationCode.code = body.invitationCode.code
    invitationCode.isUse = false

    await this._invitationCodeRepository.save(invitationCode)

    ctx.body = { invitationCode: invitationCode.toJSON() }
    ctx.status = StatusCodes.CREATED
  }
}
