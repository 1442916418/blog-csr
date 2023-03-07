/**
 * 文章类
 */
var Articles = {
  /** 文章数据列表 */
  list: [],
  /** 文章总数 */
  count: 0,
  /** 查询参数 */
  queryParams: {
    limit: 10,
    offset: 0,
    tag: '',
    author: '',
    favorited: ''
  },
  /** 初始化 */
  init: function () {
    if (!$) return

    Articles.queryArticlesList()
  },
  /** 查询文章数据 */
  queryArticlesList: function () {
    if (!BASE_URL) return

    $.requests(BASE_URL + 'articles', 'get', Articles.queryParams).then(function (res) {
      var articlesList = res.articles || []
      var articlesCount = res.articlesCount || 0

      if (articlesList && articlesList.length) {
        Articles.list = Articles.queryParams.count ? Articles.concat(articlesList) : articlesList
      } else {
        Articles.list.length = 0
      }

      Articles.count = articlesCount

      Articles.handleElements()
    })
  },
  handleElements: function () {
    if (!Articles.list.length) return

    var ele = $.getElement('#articles')

    if (!ele) return

    var html = ''

    // TODO: 样式
    Articles.list.forEach(function (item) {
      html +=
        '<article-component>' + '<span class="text-2" slot="title">' + item.title + '</span>' + '</article-component>'
    })

    ele.innerHTML = html
  }
}

window.onload = Articles.init
