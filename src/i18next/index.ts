import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import Backend from 'i18next-http-backend'
import cnResources from '../../locales/zh/translation.json'
import enResources from '../../locales/en/translation.json'

i18n
  .use(Backend) // 加载远程多语言数据
  .use(LanguageDetector) // 探测浏览器默认语言
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    // lng: 'en', // if you're using a language detector, do not define the lng option
    fallbackLng: 'cn', // 设置得语言不可用时,用这个语言
    defaultNS: 'translation', // 默认使用translation这个命名空间
    ns: ['translation','common'], // 指定命名空间列表
    // the translations
    // (tip move them in a JSON file and import them,
    // or even better, manage them via a UI: https://react.i18next.com/guides/multiple-translation-files#manage-your-translations-with-a-management-gui)
    // resources: { // 本地多语言数据, 有一点不太好的就是,会把所有的多语言数据都加载到浏览器中,不管你用不用
    //   cn: {
    //     translation: cnResources,
    //   },
    //   en: {
    //     translation: enResources,
    //   },
    // },
    // 请求远程多语言数据的配置,用到那个语言加载哪个语言
    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json', // 加载远程多语言数据的路径
    },
    debug: false, // 开启调试模式


    interpolation: {
      escapeValue: false, // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
    },
  })

export default i18n
