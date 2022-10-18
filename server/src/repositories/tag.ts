import { AppDataSource } from '../dataSource'
import { Tag } from '../model/entity/tag'

export const TagRepository = AppDataSource.getRepository(Tag)
