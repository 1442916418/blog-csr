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
  // TODO:
  async getExistingFavorite(article: Article, user: User) {
    const [findFavorited, count] = await this.findAndCount({ article, user })

    return count
  }
})
