/**
 * 文章类
 */
const Articles = {
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
  init() {
    try {
      Articles.queryArticlesList()

      setTimeout(() => {
        window.addEventListener('scroll', Articles.debounce(Articles.handleScroll, 300))
      }, 1000)
    } catch (error) {
      console.error(error)
    }
  },
  handleLoading(value) {
    Articles.loading = value

    if (typeof Loading === 'undefined') return

    if (value) {
      Loading.open()
    } else {
      Loading.close()
    }
  },
  /** 查询文章数据 */
  queryArticlesList() {
    if (!BASE.url) return

    Articles.handleLoading(true)

    $.requests(`${BASE.url}articles`, 'get', Articles.queryParams)
      .then((res) => {
        const articlesList = res.articles || []
        const articlesCount = res.articlesCount || 0

        if (articlesList && articlesList.length) {
          Articles.list = Articles.queryParams.offset ? Articles.list.concat(articlesList) : articlesList
        } else {
          Articles.list.length = 0
        }

        Articles.count = articlesCount
        Articles.handleElements()
        Articles.handleLoading(false)
      })
      .catch(() => {
        Articles.handleLoading(false)
      })
  },
  /** 处理元素 */
  handleElements() {
    if (!Articles.list.length) return

    const ele = document.querySelector('#articles')

    if (!ele) return

    let html = ''

    Articles.list.forEach((item) => {
      html += Articles.getArticleComponentElement(item)
    })

    ele.innerHTML = `<article-list>${html}</article-list>`
  },
  /** 获取文章组件元素 */
  // prettier-ignore
  getArticleComponentElement (item) {
    const author = item.author

    // <y-img lazy src="' + author.image + '" class="mr-1" style="width: 40px"></y-img>' +
    const authorEle = `<div class="flex">
                        <iconpark-icon name="me" size="25" color="#b1bcce" class="mr-1"></iconpark-icon>
                        <div class="flex flex-column justify-content-center align-items-start">
                          <b>${ author.username }</b> 
                          <span class="text-1">${ item.createdAt }</span>
                        </div>
                      </div>`

    const contentEle = `<div class="my-1 flex flex-column justify-content-center">
                          <b class="text-2 mb-1">${ item.title }</b> 
                          <span class="text-1">${ item.description }</span> 
                        </div>`
    
    const tags = item.tagList.map((tag) => `<y-button size="small" class="ml-1">${tag}</y-button>`).join(' ')
    const tagEle = `<div class="text-right">${tags}</div>`
    
    return `<article-item id="${ item.slug }"> 
              <div class="my-1 py-1 border-b-1 border-solid border-gray">
                ${authorEle}
                ${contentEle} 
                ${tagEle}
              </div>
            </article-item>`
  },
  /** 处理滚动 */
  handleScroll() {
    // 获取网页的总高度
    const scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight
    // clientHeight 是网页在浏览器中的可视高度
    const clientHeight = document.documentElement.clientHeight || document.body.clientHeight
    // scrollTop 是浏览器滚动条的 top 位置
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop

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
  debounce(fn, delay) {
    let timeout = 0

    return function () {
      timeout && clearTimeout(timeout)

      timeout = setTimeout(() => {
        fn.apply(this, arguments)
      }, delay)
    }
  }
}
