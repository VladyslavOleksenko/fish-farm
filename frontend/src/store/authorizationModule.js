export const authorizationModule = {
  state: () => ({
    authorizationStatus: false
  }),
  getters: {},
  mutations: {
    setAuthorizeStatus(state, authorizeStatus) {
      state.authorizeStatus = authorizeStatus
    }
  },
  actions: {
    authorize({commit}) {
      commit('setAuthorizeStatus', true)
    },
    disAuthorize({commit}) {
      commit('setAuthorizeStatus', false)
    }
  }
}