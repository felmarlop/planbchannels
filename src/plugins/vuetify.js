import Vue from 'vue'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'

Vue.use(Vuetify)
export default new Vuetify({
  theme: {
    dark: true,
    options: { customProperties: true },
    themes: {
      light: {
        primary: '#000000',
        secondary: '#01939e',
        tertiary: '#00eeff',
        yellow: '#e4da0b',
        white: '#ececec',
        accent: '#002f5e',
        error: '#002f5e',
        info: '#002f5e',
        success: '#002f5e',
        warning: '#002f5e'
      },
      dark: {
        primary: '#000000',
        secondary: '#006066',
        tertiary: '#00eeff',
        yellow: '#e4da0b',
        white: '#ececec',
        accent: '#002f5e',
        error: '#002f5e',
        info: '#002f5e',
        success: '#002f5e',
        warning: '#002f5e'
      }
    }
  }
})
