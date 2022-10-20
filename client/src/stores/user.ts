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
    userToken: (state) => {
      if (state.token) {
        return state.token
      }

      const localToken = window.localStorage.getItem('token')

      if (localToken) {
        return localToken
      }

      return ''
    },
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

      if (token) {
        window.localStorage.setItem('token', token)
      } else {
        window.localStorage.removeItem('token')
      }
    }
  }
})
