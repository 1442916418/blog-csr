import { defineStore } from 'pinia'

export const useEnvStore = defineStore('env', {
  state: () => {
    return {
      // isDev: process.env.VITE_APP_NODE_ENV === 'development'
      isDev: true
    }
  },
  persist: {
    enabled: true,
    strategies: [
      {
        storage: localStorage
      }
    ]
  }
})
