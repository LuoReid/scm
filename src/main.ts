import { createApp } from 'vue'
// import ElementPlus from 'element-plus'
// import 'element-plus/dist/index.css'
import App from './App.vue'

import router from '@/router'
import store from '@/store'
import { useSvgIcon } from './icons'
import './permission'

const app = createApp(App)
useSvgIcon(app)
const main = async () => {
  app.use(router).use(store)
  // app.use(ElementPlus)
  app.mount('#app')
}

main()