import { route, GET } from 'awilix-koa'
import { StatusCodes } from 'http-status-codes'
import { Context } from 'koa'

import { TagRepository } from '../repositories/tag'

import { Tag } from '../model/entity/tag'

@route('/api/tags')
export default class ProfileController {
  private _tagRepository: typeof TagRepository

  // 可以在此处注入注册到容器的任何依赖项
  constructor() {
    this._tagRepository = TagRepository
  }

  @route('')
  @GET()
  async getTags(ctx: Context) {
    const tags: Tag[] = await this._tagRepository.find()

    ctx.body = { tags: tags.map((tag: Tag) => tag.toJSON()) }
    ctx.status = StatusCodes.OK
  }
}
