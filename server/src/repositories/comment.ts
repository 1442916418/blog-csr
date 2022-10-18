import { AppDataSource } from '../dataSource'
import { Comment } from '../model/entity/comment'

export const CommentRepository = AppDataSource.getRepository(Comment)
