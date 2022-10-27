'use strict'
const pwd = process.cwd()

const isDev = process.env.NODE_ENV === 'development'
const ext = isDev ? 'ts' : 'js'

/**
 * 环境配置文件
 */
module.exports = {
  port: '3333',
  ormConfig: {
    type: 'mysql',
    host: isDev ? 'localhost' : '',
    port: 3306,
    username: isDev ? 'root' : '',
    password: isDev ? 'root' : '',
    database: 'blog',
    // TODO: 时间格式错误
    timezone: '+08:00',
    // TODO: 生产数据库关闭此选项
    // TODO: 开启数据库迁移，migrations cli:migrationsDir
    synchronize: isDev ? true : false,
    entities: ['src/model/entity/*.{js,ts}'],
    cli: {
      entitiesDir: 'src/model/entity'
    },
    logging: false
  },
  logConfig: {
    flag: true,
    outDir: `${pwd}/app/public/log`,
    level: 'info'
  },
  crypto: {
    key: 'L1H2K7R0A1F9N4E0',
    iv: 'fA0aG6eB0jJ0gB2f'
  }
}
