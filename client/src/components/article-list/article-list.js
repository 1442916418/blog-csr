export default class ArticleList extends HTMLElement {
  constructor() {
    super()
    const shadowRoot = this.attachShadow({ mode: 'open' })

    shadowRoot.innerHTML = '<slot></slot>'
  }
}

if (!customElements.get('article-list')) {
  customElements.define('article-list', ArticleList)
}
