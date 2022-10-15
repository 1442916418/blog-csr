import log4js from 'log4js'

const config = require('../../../env/index')

log4js.configure({
  appenders: { cheese: { type: 'file', filename: `${config.logConfig.outDir}/receive.log` } },
  categories: { default: { appenders: ['cheese'], level: 'info' } },
  //  pm2中默认无法输出
  pm2: true,
  pm2InstanceVar: 'isMaster' // 与pm2的instance_var对应
})

const logger = log4js.getLogger()

logger.level = config.logConfig.level

export default logger
