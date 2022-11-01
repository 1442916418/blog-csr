import { AppDataSource } from '../dataSource'

import { Favorite } from '../model/entity/favorite'
import { Article } from '../model/entity/article'
import { User } from '../model/entity/user'

export const FavoriteRepository = AppDataSource.getRepository(Favorite).extend({
  /**
   * 是否已收藏
   * @param article 文章
   * @param user 用户
   * @returns Boolean
   */
  async getIsFavorited(article: Article, user: User) {
    if (!user?.id) return false

    const count = await this.createQueryBuilder('favorite')
      .where('favorite.articleId = :articleId', { articleId: article.id })
      .andWhere('favorite.userId = :userId', { userId: user.id })
      .getOne()

    return !!count
  },
  /**
   * 获取文章是否被当前用户收藏
   * @param article 文章实体
   * @param user 用户实体
   * @returns 数量
   */
  async getExistingFavorite(article: Article, user: User) {
    if (!user?.id) return 0

    const count = await this.createQueryBuilder('favorite')
      .where('favorite.articleId = :articleId', { articleId: article.id })
      .andWhere('favorite.userId = :userId', { userId: user.id })
      .getOne()

    return count
  }
})
