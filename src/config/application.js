import pckInfo from '../../package.json'

const {
  VUE_APP_TITLE = '',
  VUE_APP_BASE_URL = '/',
  VUE_APP_API_HOST = '',
  VUE_APP_API_BASE_PATH = '',
  VUE_APP_SECURE_HOST = false,
  VUE_APP_I18N_FALLBACK_LOCALE = '',
  VUE_APP_I18N_LOCALE = ''
} = process.env

const APP_TITLE = VUE_APP_TITLE
const DEFAULT_VIEW_NAME = 'inicio'
// Github has BASE_URL set in gh-pages (process.env.BASE_URL)
const BASE_URL = process.env.BASE_URL || VUE_APP_BASE_URL || '/'
const APP_VERSION = pckInfo.version || '0.0.0'
const API_HOST = VUE_APP_API_HOST || 'localhost:8897'
const API_BASE_PATH = VUE_APP_API_BASE_PATH || '/api'

const SECURE_HOST = (VUE_APP_SECURE_HOST && ['1', 'true'].includes(String(VUE_APP_SECURE_HOST))) || false

const LOCALE = VUE_APP_I18N_LOCALE || 'es'
const LOCALE_FALLBACK = VUE_APP_I18N_FALLBACK_LOCALE || 'es'

export {
  APP_TITLE,
  APP_VERSION,
  BASE_URL,
  DEFAULT_VIEW_NAME,
  API_HOST,
  API_BASE_PATH,
  LOCALE,
  LOCALE_FALLBACK,
  SECURE_HOST
}
