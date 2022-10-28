import { defineStore } from 'pinia'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'

export enum Status {
  SIGN_IN,
  SIGN_UP
}

export const useAccountStore = defineStore('account', {
  state: () => {
    return {
      status: Status.SIGN_UP
    }
  },
  getters: {
    isSignIn: (state) => state.status === Status.SIGN_IN,
    currentStatus: (state) => state.status
  },
  actions: {
    setStatus(param: Status) {
      this.status = param
    }
  }
})
