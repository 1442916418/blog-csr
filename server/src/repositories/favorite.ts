import { AppDataSource } from '../dataSource'

import { Favorite } from '../model/entity/favorite'
import { Article } from '../model/entity/article'
import { User } from '../model/entity/user'

export const FavoriteRepository = AppDataSource.getRepository(Favorite).extend({
  // TODO:
  async favorited(article: Article, user: User) {
    const [findFavorited, count] = await this.findAndCount({ relations: ['article', 'user'] })
    console.log('🚀 ~ file: favorite.ts ~ line 11 ~ favorited ~ findFavorited, count', findFavorited, count)

    return !!count
  },
  // TODO:
  async getExistingFavorite(article: Article, user: User) {
    const [findFavorited, count] = await this.findAndCount({ relations: ['article', 'user'] })
    console.log('🚀 ~ file: favorite.ts ~ line 18 ~ getExistingFavorite ~ findFavorited, count', findFavorited, count)

    return count
  }
})
