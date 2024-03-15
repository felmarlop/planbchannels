const INIT_STATE = {
  list: [],
  search: '',
  searching: false,
  loading: false,
  group: null,
  selected: null,
  scrollY: 0,
  groupScrollY: 0
}

export default {
  namespaced: true,
  state: {
    url: 'https://gist.githubusercontent.com/felmarlop/ec1730e5cd595b3dbae7a6f8d1b93b28/raw/25077df6c02c4109c36b95c56d217db7eb6cd0f0/m3u',
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
    scrollY({ scrollY }) {
      return scrollY
    },
    groupScrollY({ groupScrollY }) {
      return groupScrollY
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
    setScrollY({ commit }, value) {
      commit('setScrollY', value)
    },
    setGroupScrollY({ commit }, value) {
      commit('setGroupScrollY', value)
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
      state.search = value || ''
    },
    setSelected(state, value) {
      state.selected = value
    },
    setScrollY(state, value) {
      state.scrollY = value
    },
    setGroupScrollY(state, value) {
      state.groupScrollY = value
    },
    setGroup(state, value) {
      state.group = value
    },
    setUrl(state, value) {
      state.url = value
    }
  }
}
