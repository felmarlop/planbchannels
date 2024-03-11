const INIT_STATE = {
  list: [],
  search: '',
  searching: false,
  loading: false,
  group: null,
  selected: null
}

export default {
  namespaced: true,
  state: {
    url: 'https://gist.githubusercontent.com/felmarlop/ec1730e5cd595b3dbae7a6f8d1b93b28/raw/3b88145d48dccc9064738d87aa7995003dd4bf81/m3u',
    ...INIT_STATE
  },
  getters: {
    list({ list }) {
      return list
    },
    loading({ loading }) {
      return loading
    },
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
    },
    url({ url }) {
      return url
    }
  },
  actions: {
    clear({ commit }) {
      commit('clear')
    },
    setList({ commit }, value) {
      commit('setList', value)
    },
    setLoading({ commit }, value) {
      commit('setLoading', value)
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
    },
    setUrl({ commit }, value) {
      commit('setUrl', value)
    }
  },
  mutations: {
    clear(state) {
      Object.assign(state, INIT_STATE)
    },
    setList(state, value) {
      state.list = value
    },
    setLoading(state, value) {
      state.loading = value
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
    },
    setUrl(state, value) {
      state.url = value
    }
  }
}
