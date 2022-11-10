const pkg = require('../package.json')
const path = require('path')
const fileUtil = require('./util/fileUtil')
const target = path.resolve(__dirname, '..\\package.json')
const source = path.resolve(__dirname, '..\\dist\\package.json')

console.log('🚀 ~ file: end.js ~ line 7 ~ 正在拷贝必要文件中...\n')

const copyArr = ['pm2.config.js']

// 拷贝 Dockerfile
for (const fileName of copyArr) {
  fileUtil.copyFile(path.resolve(__dirname, `..\\${fileName}`), path.resolve(__dirname, `..\\dist\\${fileName}`))
}

// 拷贝 env
fileUtil.copyAll(path.resolve(__dirname, '..\\bin'), path.resolve(__dirname, '..\\dist\\bin'))
fileUtil.copyAll(path.resolve(__dirname, '..\\environment'), path.resolve(__dirname, '..\\dist\\environment'))

// //拷贝 static
// fileUtil.copyAll(path.resolve(__dirname, '..\\static'), path.resolve(__dirname, '..\\dist\\static'));

// 拷贝 src 内除了 .ts 文件外的其他文件
fileUtil.copyAll(path.resolve(__dirname, '..\\src'), path.resolve(__dirname, '..\\dist\\src'), /^.*\.(?!ts).*$/)

// 拷贝 package.json 同时去除开发环境包，替换 script 标签内容
fileUtil.copyReplace(target, source, (data) => {
  let package = JSON.parse(data)
  package.devDependencies = {}
  package.scripts = {
    start: 'pm2 start pm2.config.js --env production',
    restart: 'pm2 restart ' + pkg.name,
    list: 'pm2 list',
    stop: 'pm2 stop ' + pkg.name,
    log: 'pm2 log ' + pkg.name,
    flush: 'pm2 flush',
    delete: 'pm2 delete ' + pkg.name
  }
  return JSON.stringify(package, null, '\t')
})

console.log('🚀 ~ file: end.js ~ line 42 ~ 编译完成!\n')
