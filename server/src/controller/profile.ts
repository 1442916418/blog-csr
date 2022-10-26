import { route, GET, before, inject, POST, DELETE } from 'awilix-koa'
import { StatusCodes } from 'http-status-codes'
import { Context } from 'koa'

import { AppDataSource } from '../dataSource'

import { UserRepository } from '../repositories/user'
import { FollowRepository } from '../repositories/follow'

import { User } from '../model/entity/user'
import { Follow } from '../model/entity/follow'

import AuthenticationMiddleware, { OptionalAuthenticationMiddleware } from '../middleware/authentication-middleware'

@route('/api/profiles')
export default class ProfileController {
  private _userRepository: typeof UserRepository
  private _followRepository: typeof FollowRepository

  constructor({ connection }: { connection: typeof AppDataSource }) {
    this._userRepository = UserRepository
    this._followRepository = FollowRepository
  }

  @route('/:username')
  @GET()
  @before([inject(OptionalAuthenticationMiddleware)])
  async getProfile(ctx: Context) {
    // 被关注者
    const user: User | null = await this._userRepository.findOne({ where: { username: ctx.params.username } })

    if (!user) {
      ctx.status = StatusCodes.NOT_FOUND
      return
    }

    const following: boolean = await this._followRepository.following(ctx.state.user, user)

    ctx.body = { profile: user.toProfileJSON(following) }
    ctx.status = StatusCodes.OK
  }

  @route('/:username/follow')
  @POST()
  @before([inject(AuthenticationMiddleware)])
  async followUser(ctx: Context) {
    const user: User | null = await this._userRepository.findOne({ where: { username: ctx.params.username } })

    if (!user) {
      ctx.status = StatusCodes.NOT_FOUND
      return
    }

    const following: boolean = await this._followRepository.following(ctx.state.user, user)

    if (!following) {
      const follow: Follow = new Follow()
      follow.follower = ctx.state.user
      follow.following = user
      await this._followRepository.save(follow)
    }

    ctx.body = { profile: user.toProfileJSON(true) }
    ctx.status = StatusCodes.OK
  }

  @route('/:username/follow')
  @DELETE()
  @before([inject(AuthenticationMiddleware)])
  async unFollowUser(ctx: Context) {
    // 被关注者
    const user: User | null = await this._userRepository.findOne({ where: { username: ctx.params.username } })

    if (!user) {
      ctx.status = StatusCodes.NOT_FOUND
      return
    }

    const followerUser: User = ctx.state.user

    // @ts-ignore
    await this._followRepository.delete({ following: user, follower: followerUser })

    ctx.body = { profile: user.toProfileJSON(false) }
    ctx.status = StatusCodes.OK
  }
}
