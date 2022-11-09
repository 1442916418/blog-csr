const path = require('path')
const fileUtil = require('./util/fileUtil')

console.log('🚀 ~ file: encryption.js ~ line 4 ~ 开始加密中...\n')

// 代码加密
global.encryptionError = {} // 加密错误信息
fileUtil.encryptionPath(path.resolve(__dirname, '..\\dist\\src'), path.resolve(__dirname, '..\\dist\\src'), /\.js$/)

if (Object.keys(global.encryptionError).length === 0) {
  console.log('\n🚀 ~ file: encryption.js ~ line 11 ~ 全部加密成功!')
  console.log('源代码加密完成!')
  console.log('直接发布更新 dist 目录下的全部文件即可!')
  console.log('如果没有安装 pm2:npm install pm2 -g ')
  console.log('pm2启动服务: npm run start\n')
} else {
  console.log('\n🚀 ~ file: encryption.js ~ line 17 ~ 加密失败: ', global.encryptionError)
  console.error('加密失败个数:', Object.keys(global.encryptionError).length, '\n')
}
