import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import cnResources from '../../locales/zh-CN.json'
import enResources from '../../locales/en.json'

i18n
  .use(LanguageDetector) // 探测浏览器默认语言
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    // the translations
    // (tip move them in a JSON file and import them,
    // or even better, manage them via a UI: https://react.i18next.com/guides/multiple-translation-files#manage-your-translations-with-a-management-gui)
    resources: { // 本地多语言数据
      cn: {
        translation: cnResources,
      },
      en: {
        translation: enResources,
      },
    },
    // lng: 'en', // if you're using a language detector, do not define the lng option
    fallbackLng: 'cn', // 设置得语言不可用时,用这个语言

    interpolation: {
      escapeValue: false, // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
    },
  })

export default i18n
