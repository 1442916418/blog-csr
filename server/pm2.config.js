const pkg = require('./package.json')

module.exports = {
  apps: [
    {
      name: pkg.name, //应用程序名称
      script: 'bin/www', //应用程序的脚本路径
      cwd: './', //根目录
      max_restarts: 10,
      exec_mode: 'fork',
      log_date_format: 'YYYY-MM-DD HH:mm:ss',
      max_memory_restart: '500M',
      out_file: './pm2/logs/pm2-out.log',
      error_file: './pm2/logs/pm2-err.log',
      watch: true,
      ignore_watch: ['node_modules', '.pm2/logs/**'],
      instance_var: 'isMaster',
      merge_logs: true,
      autorestart: true,
      env: {
        NODE_ENV: 'production'
      }
    }
  ]
}
