import { fileURLToPath, URL } from 'node:url'

import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.')

  return {
    plugins: [vue()],
    server: {
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
    }
  }
})
