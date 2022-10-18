import { AppDataSource } from '../dataSource'
import { Article } from '../model/entity/article'

export const ArticleRepository = AppDataSource.getRepository(Article)
