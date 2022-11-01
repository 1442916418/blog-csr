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
  async getIsFollowing(follower: User, following: User): Promise<boolean> {
    if (!follower?.id || !following?.id) return false

    const count = await this.createQueryBuilder('follow')
      .where('follow.followerId = :followerId', { followerId: follower.id })
      .andWhere('follow.followingId = :followingId', { followingId: following.id })
      .getOne()

    return !!count
  }
})
