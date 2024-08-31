import { createI18n } from "vue-i18n"
import zhCN from './zh-CN.json'

export const i18n = createI18n({
  legacy: false, // 设为true或者不设置
  locale: 'zhCN',
  fallbackLocale: 'zhCN',
  messages: {
    zhCN,
    en: {
      message: {
        hello: 'hello world'
      }
    },
    ja: {
      message: {
        hello: 'こんにちは、世界'
      }
    }
  }
})

