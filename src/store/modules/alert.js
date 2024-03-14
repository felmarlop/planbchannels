const INIT_STATE = {
  message: '',
  timeout: null
}

export default {
  namespaced: true,
  state: {
    ...INIT_STATE
  },
  getters: {
    message({ message }) {
      return message
    }
  },
  actions: {
    clear({ commit }) {
      commit('clear')
    },
    setMessage({ commit }, value) {
      commit('setMessage', value)
    }
  },
  mutations: {
    clear(state) {
      Object.assign(state, INIT_STATE)
    },
    setMessage(state, value) {
      clearTimeout(state.timeout)
      state.message = value
      state.timeout = setTimeout(() => {
        state.message = ''
      }, 4000)
    }
  }
}
