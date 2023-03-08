var BASE_URL = 'https://www.yss.world/api/'

var Loading = {
  open: function () {
    if (!$) return

    var loadingEle = $.getElement('#loading')

    if (!loadingEle) return

    if (loadingEle.classList.contains('none')) {
      loadingEle.classList.remove('none')
      loadingEle.classList.add('block')
    }
  },
  close: function () {
    if (!$) return

    var loadingEle = $.getElement('#loading')

    if (!loadingEle) return

    if (loadingEle.classList.contains('block')) {
      loadingEle.classList.remove('block')
      loadingEle.classList.add('none')
    }
  }
}
