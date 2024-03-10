const INIT_STATE = {
  message: ''
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
      state.message = value
      setTimeout(() => {
        state.message = ''
      }, 4000)
    }
  }
}
