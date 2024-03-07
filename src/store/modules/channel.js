const INIT_STATE = {
  search: '',
  searching: false,
  group: null,
  selected: null
}

export default {
  namespaced: true,
  state: { ...INIT_STATE },
  getters: {
    searching({ searching }) {
      return searching
    },
    search({ search }) {
      return search
    },
    group({ group }) {
      return group
    },
    selected({ selected }) {
      return selected
    }
  },
  actions: {
    clear({ commit }) {
      commit('clear')
    },
    setSearching({ commit }, value) {
      commit('setSearching', value)
    },
    setSearch({ commit }, value) {
      commit('setSearch', value)
    },
    setSelected({ commit }, value) {
      commit('setSelected', value)
    },
    setGroup({ commit }, value) {
      commit('setGroup', value)
    }
  },
  mutations: {
    clear(state) {
      Object.assign(state, INIT_STATE)
    },
    setSearching(state, value) {
      state.searching = value
    },
    setSearch(state, value) {
      state.search = value
    },
    setSelected(state, value) {
      state.selected = value
    },
    setGroup(state, value) {
      state.group = value
    }
  }
}
