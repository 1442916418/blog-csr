export default class ArticleComponent extends HTMLElement {
  static get observedAttributes() {
    return ['list']
  }

  constructor() {
    super()
    const shadowRoot = this.attachShadow({ mode: 'open' })

    shadowRoot.innerHTML = `
                            <div class="my-1">
                              <slot name="title"></slot>
                            </div>
                            `
  }
}

if (!customElements.get('article-component')) {
  customElements.define('article-component', ArticleComponent)
}
