import { DataSource } from 'typeorm'

const config = require('../environment/index')

export const AppDataSource = new DataSource(config.ormConfig)
