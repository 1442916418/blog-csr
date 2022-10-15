import { DataSource } from 'typeorm'

const config = require('../env/index')

export const AppDataSource = new DataSource(config.ormConfig)
