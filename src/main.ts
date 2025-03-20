import { createApp } from 'vue'
import App from './App.vue'
import router from './plugins/router'
import elementPlusIcons from '@/plugins/element-plus-icons'

import pinia from '@/plugins/pinia'
import i18n from '@/lib/lang/index'

import ElementPlus from 'element-plus'
import '@/assets/index.css'
import 'element-plus/dist/index.css'
import './style.css'
import { dayjs } from 'element-plus'

// 设置每周第一天为周一
;(dayjs as any).en.weekStart = 1

const app = createApp(App).use(router).use(pinia).use(ElementPlus).use(i18n).use(elementPlusIcons)
app.mount('#app')
