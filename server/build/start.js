const path = require('path')
const fileUtil = require('./util/fileUtil')

//清空输出文件
fileUtil.clearAll(path.resolve(__dirname, '..\\dist'))

console.log('\n🚀 ~ file: start.js ~ line 7 ~ 正在编译 TypeScript 文件中...\n')
