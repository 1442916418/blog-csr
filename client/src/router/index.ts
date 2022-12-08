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
      meta: {
        title: '主页',
        keepAlive: false
      },
      component: layout,
      redirect: { name: 'home' },
      children: [
        {
          path: 'home',
          name: 'home',
          meta: {
            title: '首页',
            keepAlive: true
          },
          component: () => import('@/views/home/index.vue')
        },
        {
          path: 'account',
          name: 'account',
          meta: {
            title: '账户',
            keepAlive: false
          },
          component: () => import('@/views/account/index.vue')
        },
        {
          path: 'articles/:slug?',
          name: 'articles',
          meta: {
            title: '文章',
            keepAlive: false
          },
          component: () => import('@/views/articles/index.vue')
        },
        {
          path: 'user/:username',
          name: 'user',
          meta: {
            title: '用户',
            keepAlive: false
          },
          component: () => import('@/views/user/index.vue')
        },
        {
          path: 'userSetting',
          name: 'userSetting',
          meta: {
            title: '用户配置',
            keepAlive: false
          },
          component: () => import('@/views/user-setting/index.vue')
        },
        {
          path: 'articleDetails/:slug',
          name: 'articleDetails',
          meta: {
            title: '文章详情',
            keepAlive: false
          },
          component: () => import('@/views/article-details/index.vue')
        }
      ]
    },
    {
      path: '/404',
      name: '404',
      meta: {
        title: '404',
        keepAlive: false
      },
      component: () => import('@/views/exception/404.vue')
    },
    {
      path: '/:catchAll(.*)',
      redirect: '/404'
    }
  ]
})

router.beforeEach((to, from, next) => {
  NProgress.start()

  if (['/account'].includes(to.path) && JSON.stringify(to.query) === '{}') {
    next({ path: to.path, query: { redirect: from.path } })
  } else {
    next()
  }
})

router.afterEach((to) => {
  NProgress.done()
})

export default router
