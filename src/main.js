import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import axios from './config/request'
import VueAxios from 'vue-axios'
import '@/assets/style/common.css'

const app = createApp(App)

app.use(router)
app.use(ElementPlus)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
app.use(mavonEditor)
app.use(VueAxios, axios)

app.mount('#app')
