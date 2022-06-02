import { createApp } from 'vue'
// import ElementPlus from 'element-plus'
// import 'element-plus/dist/index.css'

import './styles/index.scss'
import './assets/iconfont/iconfont.js'
import './assets/iconfont/iconfont.css'

import App from './App.vue'

import router from '@/router'
import store from '@/store'
import { useSvgIcon } from './icons'
import './permission'

import registerDirective from '@/directive'

const app = createApp(App)
useSvgIcon(app)
const main = async () => {
  app.use(router).use(store)
  // app.use(ElementPlus)
  // await registerDirective(app)
  await router.isReady()
  app.mount('#app')
}

main()