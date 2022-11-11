import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPersist from 'pinia-plugin-persist'

import App from './App.vue'
import router from './router'

import './assets/styles/base.css'

import mdEditor from 'md-editor-v3'
import 'md-editor-v3/lib/style.css'

mdEditor.config({
  markedRenderer(renderer) {
    renderer.link = (href, title, text) => {
      return `<a href="${href}" title="${title}" target="_blank">${text}</a>`
    }

    return renderer
  }
})

const app = createApp(App)

const pinia = createPinia()
pinia.use(piniaPersist)

app.component('mdEditor', mdEditor)

app.use(pinia).use(router)

app.mount('#app')
