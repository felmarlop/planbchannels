import Vue from 'vue'
import Vuex from 'vuex'

import alert from '@/store/modules/alert'
import channel from '@/store/modules/channel'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: { alert, channel }
})
