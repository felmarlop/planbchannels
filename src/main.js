import '@/assets/scss/main.scss'

import Vue from 'vue'

import App from './App.vue'
import i18n from './plugins/i18n'
import router from './router'
import vuetify from './plugins/vuetify'

new Vue({
  i18n,
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
