import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPersist from 'pinia-plugin-persist'

import App from './App.vue'
import router from './router'
console.log('🚀 ~ file: main.ts ~ line 7 ~ router', router)

import './assets/styles/base.css'

import mdEditor from 'md-editor-v3'
import 'md-editor-v3/lib/style.css'

const app = createApp(App)

const pinia = createPinia()
pinia.use(piniaPersist)

app.component('mdEditor', mdEditor)

app.use(pinia).use(router)

app.mount('#app')
