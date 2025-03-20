import { createI18n } from 'vue-i18n'
import enUSLocale from './en_US.json'
import zhCNLocale from './zh_CN.json'

const messages = {
  en: enUSLocale,
  zh_cn: zhCNLocale,
}

let locale = 'zh_cn'
const lang = localStorage.getItem('lang')
if (typeof lang !== 'undefined' && lang !== null) {
  locale = lang || 'zh_cn'
}
const i18n = createI18n({
  legacy: false,
  locale, // 首先从缓存里拿，没有的话就用浏览器语言，
  fallbackLocale: 'zh_cn', // 设置备用语言
  messages,
})

export default i18n
