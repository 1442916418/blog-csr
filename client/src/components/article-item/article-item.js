export default class ArticleItem extends HTMLElement {
  constructor() {
    super()
    const shadowRoot = this.attachShadow({ mode: 'open' })

    shadowRoot.innerHTML = '<slot></slot>'
  }

  get id() {
    return this.getAttribute('id')
  }

  connectedCallback() {
    this.shadowRootClick = () => this.handleShadowRootClickEvent()

    this.shadowRoot.addEventListener('click', this.shadowRootClick)
  }

  disconnectedCallback() {
    this.shadowRoot.removeEventListener('click', this.shadowRootClick)
  }

  handleShadowRootClickEvent() {
    if (this.id) {
      window.open(location.origin + '/views/article-detail/' + this.id)
    }
  }
}

if (!customElements.get('article-item')) {
  customElements.define('article-item', ArticleItem)
}
