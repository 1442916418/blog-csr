var BASE_URL = 'https://www.yss.world/api/'

/** Loading 类 */
var Loading = {
  /** 状态 */
  status: false,
  /** 打开 */
  open: function () {
    if (!$) return

    var loadingEle = $.getElement('#loading')

    if (!loadingEle) return

    Loading.status = true

    if ($.hasClass(loadingEle, 'none')) {
      $.removeClass(loadingEle, 'none')
      $.addClass(loadingEle, 'block')
    }
  },
  /** 关闭 */
  close: function () {
    if (!$) return

    var loadingEle = $.getElement('#loading')

    if (!loadingEle) return

    Loading.status = false

    if ($.hasClass(loadingEle, 'block')) {
      $.removeClass(loadingEle, 'block')
      $.addClass(loadingEle, 'none')
    }
  }
}

var Navigation = {
  init: function () {
    if (!$) return

    var navEle = $.getElement('nav')

    if (!navEle) return

    var previousScroll = 0

    $.addEvent(window, 'scroll', function () {
      var currentScroll = window.pageYOffset || document.documentElement.scrollTop

      if (currentScroll > previousScroll) {
        // Scrolled down
        if (currentScroll > 100) {
          $.addClass(navEle, ' nav-unpinned box-shadow-soft ')
        }
      } else {
        // Scrolled up
        if (currentScroll === 0) {
          $.removeClass(navEle, ' nav-unpinned nav-pinned box-shadow-soft ')
        } else {
          $.addClass(navEle, ' nav-pinned box-shadow-soft ')
        }
      }

      previousScroll = currentScroll
    })
  }
}

window.onload = function () {
  Articles.init()
  Navigation.init()
}
