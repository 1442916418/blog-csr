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
  /** 翻页偏移量 */
  offsetStep: 10,
  /** 是否加载 */
  loading: false,
  /** 初始化 */
  init: function () {
    if (!$) return

    Articles.queryArticlesList()

    setTimeout(() => {
      $.addEvent(window, 'scroll', Articles.debounce(Articles.handleScroll, 300))
    }, 1000)
  },
  handleLoading: function (value) {
    Articles.loading = value

    if (value) {
      Loading.open()
    } else {
      Loading.close()
    }
  },
  /** 查询文章数据 */
  queryArticlesList: function () {
    if (!BASE_URL) return

    Articles.handleLoading(true)

    $.requests(BASE_URL + 'articles', 'get', Articles.queryParams)
      .then(function (res) {
        var articlesList = res.articles || []
        var articlesCount = res.articlesCount || 0

        if (articlesList && articlesList.length) {
          Articles.list = Articles.queryParams.offset ? Articles.list.concat(articlesList) : articlesList
        } else {
          Articles.list.length = 0
        }

        Articles.count = articlesCount

        Articles.handleElements()

        Articles.handleLoading(false)
      })
      .catch(function () {
        Articles.handleLoading(false)
      })
  },
  /** 处理元素 */
  handleElements: function () {
    if (!Articles.list.length) return

    var ele = $.getElement('#articles')

    if (!ele) return

    var html = ''

    Articles.list.forEach(function (item) {
      var element = Articles.getArticleComponentElement(item)
      html += element
    })

    ele.innerHTML = '<article-list>' + html + '</article-list>'
  },
  /** 获取文章组件元素 */
  // prettier-ignore
  getArticleComponentElement: function (item) {
    var author = item.author

    // '<y-img lazy src="' + author.image + '" class="mr-1" style="width: 40px"></y-img>' +
    var authorEle = '<div class="flex">' +
                      '<iconpark-icon name="me" size="25" color="#b1bcce" class="mr-1"></iconpark-icon>' +
                      '<div class="flex flex-column justify-content-center align-items-start">' + 
                        '<b>' + author.username + '</b>' + 
                        '<span class="text-1">' + item.createdAt + '</span>' +
                      '</div>' +
                    '</div>'

    var contentEle = '<div class="my-1 flex flex-column justify-content-center">' +
                       '<b class="text-2 mb-1">' + item.title + '</b>' + 
                       '<span class="text-1">' + item.description + '</span>' + 
                     '</div>'
    
    var tags = item.tagList.map(function(tag){
                 return '<y-button size="small" class="ml-1">' + tag + '</y-button>'
               }).join(' ')

    var tagEle = '<div class="text-right">' + tags + '</div>'
    

    return '<article-item id="' + item.slug + '">' + 
              '<div class="my-1 py-1 border-b-1 border-solid border-gray">' +
                authorEle +
                contentEle + 
                tagEle +
              '</div>' +
            '</article-item>'
  },
  /** 处理滚动 */
  handleScroll: function () {
    // 获取网页的总高度
    var scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight
    // clientHeight 是网页在浏览器中的可视高度
    var clientHeight = document.documentElement.clientHeight || document.body.clientHeight
    // scrollTop 是浏览器滚动条的 top 位置
    var scrollTop = document.documentElement.scrollTop || document.body.scrollTop

    // 底部
    if (scrollTop + clientHeight >= scrollHeight - 50 && !Articles.loading) {
      if (Articles.count > Articles.queryParams.offset + Articles.offsetStep) {
        Articles.queryParams.offset += Articles.offsetStep
        Articles.queryArticlesList()
      }
    }

    // 顶部
    if (scrollTop === 0 && !Articles.loading) {
      if (Articles.queryParams.offset) {
        Articles.queryParams.offset = 0
        Articles.queryArticlesList()
      }
    }
  },
  /** 防抖 */
  debounce: function (fn, delay) {
    var timeout = 0

    return function () {
      timeout && clearTimeout(timeout)

      timeout = setTimeout(() => {
        fn.apply(this, arguments)
      }, delay)
    }
  }
}
