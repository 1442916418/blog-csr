const BASE = {
  url: 'https://www.yss.world/api/'
}

/** Loading 类 */
const Loading = {
  /** 状态 */
  status: false,
  /** 打开 */
  open: function () {
    const loadingEle = document.querySelector('#loading')

    if (!loadingEle) return

    Loading.status = true

    if (loadingEle.classList.contains('none')) {
      loadingEle.classList.remove('none')
      loadingEle.classList.add('block')
    }
  },
  /** 关闭 */
  close: function () {
    const loadingEle = document.querySelector('#loading')

    if (!loadingEle) return

    Loading.status = false

    if (loadingEle.classList.contains('block')) {
      loadingEle.classList.remove('block')
      loadingEle.classList.add('none')
    }
  }
}

const Navigation = {
  init: function () {
    const navEle = document.querySelector('nav')

    if (!navEle) return

    let previousScroll = 0

    const fixedClass = ['position-fixed', 'top-0', 'w-100', 'z-9']

    window.addEventListener('scroll', () => {
      const currentScroll = window.pageYOffset || document.documentElement.scrollTop

      if (currentScroll > previousScroll) {
        // Scrolled down
        if (currentScroll > 100) {
          navEle.classList.remove('nav-pinned')
          navEle.classList.add(...fixedClass, 'nav-unpinned', 'box-shadow-soft')
        }
      } else {
        // Scrolled up
        if (currentScroll === 0) {
          navEle.classList.remove(...fixedClass, 'nav-unpinned', 'nav-pinned', 'box-shadow-soft')
        } else {
          navEle.classList.remove('nav-unpinned')
          navEle.classList.add('nav-pinned')
        }
      }

      previousScroll = currentScroll
    })
  }
}

;(function () {
  Navigation.init()
  Articles.init()
})()
