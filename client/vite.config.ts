import { fileURLToPath, URL } from 'node:url'

import vue from '@vitejs/plugin-vue'
import { defineConfig, loadEnv } from 'vite'
import { createHtmlPlugin } from 'vite-plugin-html'
import viteCompression from 'vite-plugin-compression'

const config = {
  // 基础路径
  publicPath: './',
  // 输出文件的目录
  outputDir: 'dist',
  // 静态目录
  assetsDir: 'assets',
  // 页面标题
  title: '企鹅的Center',
  // Gzip
  zip: true,
  cdn: ''
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.')
  const isProd = env.VITE_APP_NODE_ENV === 'production'

  console.log('🚀 ~ file: vite.config.ts ~ line 27 ~ defineConfig ~ env: \n', env)

  const plugins = [
    vue(),
    createHtmlPlugin({
      minify: true, // 是否压缩 html
      /**
       * 在这里写 entry 后，你将不需要在`index.html`内添加 script 标签，原有标签需要删除
       * @default src/main.ts
       */
      entry: 'src/main.ts',
      /**
       * 如果你想将 `index.html` 存放在指定文件夹，可以修改它，否则不需要配置
       * @default index.html
       */
      // 例如: "public/index.html"
      template: '/index.html',
      inject: {
        data: {
          title: config.title,
          injectScript: config.cdn || ''
        }
      }
    })
  ]

  if (config.zip) {
    plugins.push(
      viteCompression({
        verbose: true,
        disable: false,
        threshold: 10240,
        algorithm: 'gzip',
        ext: '.gz'
      })
    )
  }

  return {
    plugins,
    server: {
      host: '0.0.0.0',
      proxy: {
        [env.VITE_APP_BASE_API_PATH]: {
          target: env.VITE_APP_BASE_URL,
          changeOrigin: true
        }
      }
    },
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
    esbuild: {
      pure: isProd ? ['console.log', 'debugger'] : []
    },
    build: {
      target: 'es2015',
      cssTarget: 'chrome79',
      chunkSizeWarningLimit: 1000,
      outDir: config.outputDir,
      assetsDir: config.assetsDir,
      manifest: false,
      reportCompressedSize: true,
      rollupOptions: {}
    }
  }
})
