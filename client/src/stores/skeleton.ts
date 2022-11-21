import { defineStore } from 'pinia'

export const useSkeletonStore = defineStore('skeleton', {
  state: () => {
    return {
      loading: false
    }
  },
  actions: {
    setLoading(value: boolean) {
      this.loading = value
    }
  }
})
