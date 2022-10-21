import { createRouter, createWebHistory } from 'vue-router'

import layout from '@/views/layout/index.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'main',
      component: layout,
      redirect: '/home',
      children: [
        {
          path: 'home',
          name: 'home',
          component: () => import('@/views/home/index.vue')
        },
        {
          path: 'account',
          name: 'account',
          component: () => import('@/views/account/index.vue')
        },
        {
          path: 'articles',
          name: 'articles',
          component: () => import('@/views/articles/index.vue')
        }
      ]
    }
  ]
})

export default router
