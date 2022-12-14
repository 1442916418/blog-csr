import { fileURLToPath, URL } from 'node:url'

import vue from '@vitejs/plugin-vue'
import { defineConfig, loadEnv } from 'vite'
import viteCompression from 'vite-plugin-compression'

const config = {
  // 基础路径
  publicPath: './',
  // 输出文件的目录
  outputDir: 'dist',
  // 静态目录
  assetsDir: 'assets',
  // 页面标题
  title: '牛牛四季',
  // Gzip
  zip: true,
  cdn: ''
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.')
  const isProd = env.VITE_APP_NODE_ENV === 'production'

  console.log('🚀 ~ file: vite.config.ts ~ line 27 ~ defineConfig ~ env: \n', env)

  const plugins = [vue()]

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
    },
    define: {
      'process.env': {
        VITE_APP_NODE_ENV: env.VITE_APP_NODE_ENV,
        VITE_APP_BASE_API_PATH: env.VITE_APP_BASE_API_PATH
      }
    }
  }
})
