import { createRouter, createWebHistory } from 'vue-router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

import layout from '@/views/layout/index.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'main',
      component: layout,
      redirect: { name: 'home' },
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
          path: 'articles/:slug?',
          name: 'articles',
          component: () => import('@/views/articles/index.vue')
        },
        {
          path: 'user/:username',
          name: 'user',
          component: () => import('@/views/user/index.vue')
        },
        {
          path: 'userSetting',
          name: 'userSetting',
          component: () => import('@/views/user-setting/index.vue')
        },
        {
          path: 'articleDetails/:slug',
          name: 'articleDetails',
          component: () => import('@/views/article-details/index.vue')
        }
      ]
    }
  ]
})

router.beforeEach((to, from, next) => {
  NProgress.start()

  if (to.path === '/account' && JSON.stringify(to.query) === '{}') {
    next({ path: '/account', query: { redirect: from.path } })
  } else {
    next()
  }
})

router.afterEach(() => {
  NProgress.done()
})

export default router
