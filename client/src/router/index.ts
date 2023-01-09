import { createRouter, createWebHistory } from 'vue-router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

import { routeList } from './list'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routeList
})

router.beforeEach((to, from, next) => {
  NProgress.start()

  if (['/account'].includes(to.path) && JSON.stringify(to.query) === '{}') {
    next({ path: to.path, query: { redirect: from.path } })
  } else {
    next()
  }
})

router.afterEach(() => {
  NProgress.done()
})

export default router
