import { createPinia } from 'pinia'
import TDesign from 'tdesign-vue-next'
import { createApp } from 'vue'
import App from './App.vue'
import setupDirectives from './directives'
import router from './router'
import '@unocss/reset/normalize.css'
import '@/assets/styles/main.css'
import './permission.js'
import 'tdesign-vue-next/es/style/index.css'
import 'virtual:uno.css'
import 'animate.css'
import '@/static/font/iconfont.css'
// vue3-observe-visibility

const app = createApp(App)
const pinia = createPinia()

app.use(router)
app.use(TDesign)
app.use(pinia)
setupDirectives(app)

app.mount('#app')
