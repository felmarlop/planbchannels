import '@/assets/scss/main.scss'

import Vue from 'vue'

import App from './App.vue'
import i18n from './plugins/i18n'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'

new Vue({
  i18n,
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
