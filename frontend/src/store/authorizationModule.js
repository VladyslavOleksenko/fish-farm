export default {
  namespaced: true,
  state: () => ({
    token: "",
  }),
  getters: {
    getAuthorizationStatus(state) {
      return !!state.token
    }
  },
  mutations: {
    setToken(state, token) {
      state.token = token
      localStorage.token = token
    }
  },
  actions: {
    logout({commit}) {
      commit('setToken', "")
      localStorage.clear()
    }
  }
}