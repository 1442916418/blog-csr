/**
 * 文章详情类
 */
const ArticleDetail = {
  id: '',
  detail: {},
  init() {
    try {
      ArticleDetail.handleSearchParams()
      ArticleDetail.queryArticleDetail()
    } catch (error) {
      console.error(error)
      ArticleDetail.id = ''
      ArticleDetail.detail = {}
    }
  },
  handleSearchParams() {
    const params = new URLSearchParams(location.search)

    ArticleDetail.id = params.get('id')
  },
  /** 查询文章数据 */
  queryArticleDetail() {
    if (!BASE.url || !ArticleDetail.id) return

    ArticleDetail.handleLoading(true)

    $.requests(`${BASE.url}articles/${ArticleDetail.id}`, 'get')
      .then((res) => {
        ArticleDetail.detail = res && res.article ? res.article : {}
        ArticleDetail.handleElements()
        ArticleDetail.handleLoading(false)
      })
      .catch(() => {
        ArticleDetail.handleLoading(false)
      })
  },
  handleElements() {
    if (!ArticleDetail.detail) return

    if (ArticleDetail.detail.title) {
      document.title = ArticleDetail.detail.title
    }

    const articleDetailEle = document.querySelector('#article-detail')

    if (!articleDetailEle) return

    articleDetailEle.innerHTML = this.getDetailElement()
  },
  getDetailElement() {
    const detail = ArticleDetail.detail
    const author = detail.author

    const head = `<div class='py-1'>
                    <div class="mb-1 text-2xl font-weight-bold">${detail.title}</div>
                    <div class="flex">
                      <iconpark-icon name="me" size="25" color="#b1bcce" class="mr-1"></iconpark-icon>
                      <div class="flex flex-column justify-content-center align-items-start">
                        <b>${author.username}</b> 
                        <span class="text-1">${detail.createdAt}</span>
                      </div>
                    </div>
                  </div>`

    const description = `<p class='text-grays-600 mt-1 mb-2'>${detail.description}</p>`

    const body = `<div class='default-theme'>${detail.body}</div>`

    return `${head} ${description} ${body}`
  },
  handleLoading(value) {
    if (value) {
      Loading && Loading.open()
    } else {
      Loading && Loading.close()
    }
  }
}

window.onload = ArticleDetail.init()
