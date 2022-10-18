import { AppDataSource } from '../dataSource'

import { User } from '../model/entity/user'

export const UserRepository = AppDataSource.getRepository(User)
