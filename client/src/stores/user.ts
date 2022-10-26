import { defineStore } from 'pinia'

export interface User {
  email?: string
  username?: string
  bio?: string
  image?: string
  token?: string
}

export const useUserStore = defineStore('user', {
  state: (): User => {
    return {
      email: undefined,
      username: undefined,
      bio: undefined,
      image: undefined,
      token: undefined
    }
  },
  getters: {
    userName: (state) => state?.username ?? '',
    userImage: (state) => state?.image ?? '',
    userToken: (state) => state?.token ?? '',
    isUser: (state) => !!state.token
  },
  actions: {
    setUser(params: User) {
      const token = params?.token ?? undefined

      this.email = params?.email ?? undefined
      this.username = params?.username ?? undefined
      this.bio = params?.bio ?? undefined
      this.image = params?.image ?? undefined
      this.token = token
    },
    resetUser() {
      this.email = undefined
      this.username = undefined
      this.bio = undefined
      this.image = undefined
      this.token = undefined
    }
  },
  persist: {
    enabled: true
  }
})
