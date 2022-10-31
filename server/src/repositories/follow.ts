import { AppDataSource } from '../dataSource'

import { Follow } from '../model/entity/follow'
import { User } from '../model/entity/user'

export const FollowRepository = AppDataSource.getRepository(Follow).extend({
  /**
   * 被关注者是否已被关注
   * @param follower 关注者
   * @param following 被关注者
   * @returns boolean
   */
  async following(follower: User, following: User): Promise<boolean> {
    const [findFollow, count] = await this.findAndCount({ follower, following })
    console.log('🚀 ~ file: follow.ts ~ line 15 ~ following ~ findFollow, count', findFollow, count)

    return !!count
  }
})
