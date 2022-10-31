import { AppDataSource } from '../dataSource'

import { Favorite } from '../model/entity/favorite'
import { Article } from '../model/entity/article'
import { User } from '../model/entity/user'

export const FavoriteRepository = AppDataSource.getRepository(Favorite).extend({
  // TODO:
  async favorited(article: Article, user: User) {
    const [findFavorited, count] = await this.findAndCount({ article, user })

    return !!count
  },
  // TODO: 查询错误
  /**
   * 获取文章是否被当前用户收藏
   * @param article 文章实体
   * @param user 用户实体
   * @returns 数量
   */
  async getExistingFavorite(article: Article, user: User) {
    const [findFavorited, count] = await this.findAndCount({ article, user })
    console.log('🚀 ~ file: favorite.ts ~ line 22 ~ getExistingFavorite ~ findFavorited, count', findFavorited, count)

    return count
  }
})
