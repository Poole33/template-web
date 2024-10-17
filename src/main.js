import '@unocss/reset/normalize.css'
import '@/assets/styles/main.css'
import './permission.js'
import setupDirectives from './directives'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/reset.css'
import 'virtual:uno.css'
import 'animate.css'
import '@/static/font/iconfont.css'
// vue3-observe-visibility



const app = createApp(App)
const pinia = createPinia()

app.use(router)
app.use(Antd)
app.use(pinia)
setupDirectives(app)


app.mount('#app')
