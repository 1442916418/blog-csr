import { defineStore } from 'pinia'

export const useThemeStore = defineStore('theme', {
  state: () => {
    return {
      idDark: false
    }
  },
  actions: {
    setStatus(value: boolean) {
      this.idDark = value
    }
  }
})
