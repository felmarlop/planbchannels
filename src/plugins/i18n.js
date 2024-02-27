import requireContext from 'require-context.macro'
import Vue from 'vue'
import VueI18n from 'vue-i18n'

import { LOCALE, LOCALE_FALLBACK } from '@/config'

Vue.use(VueI18n)

function loadLocaleMessages() {
  const locales = requireContext('@/locales', true, /[A-Za-z0-9-_,\s]+\.json$/i)
  const messages = {}
  locales.keys().forEach(key => {
    const [_, language] = key.match(/([A-Za-z0-9-_]+)\./i)
    if (language) {
      messages[language] = locales(key)
    }
  })
  return messages
}

export default new VueI18n({
  locale: LOCALE,
  fallbackLocale: LOCALE_FALLBACK,
  messages: loadLocaleMessages(),
  silentFallbackWarn: true,
  silentTranslationWarn: true
})
