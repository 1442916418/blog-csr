import { handleChildrenRoute } from '@/utils/common'

import layout from '@/views/layout/index.vue'

const projectsChildFile = import.meta.glob('../views/projects/*/index.vue')
const cssProjectsChildFile = import.meta.glob('../views/projects/css/*/index.vue')
const projectsChild = [
  ...handleChildrenRoute({ files: projectsChildFile, exclude: ['keyboard'] }),
  ...handleChildrenRoute({ files: cssProjectsChildFile, prefix: 'css' })
]

export const routeList = [
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
    path: '/projects',
    name: 'projects',
    meta: {
      title: '项目',
      keepAlive: false
    },
    component: layout,
    redirect: { name: 'decimal-conversion' },
    children: projectsChild
  },
  {
    path: '/list',
    name: 'list',
    meta: {
      title: '应用列表',
      keepAlive: false
    },
    component: () => import('@/views/list/index.vue')
  },
  {
    path: '/keyboard',
    name: 'keyboard',
    meta: {
      title: '应用 - 键盘',
      keepAlive: false
    },
    component: () => import('@/views/projects/keyboard/index.vue')
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
