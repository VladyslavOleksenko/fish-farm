import {getOwnFarms} from "@/assets/js/serverRequest";

export default {
  namespaced: true,
  state: () => ({
    ownFarms: []
  }),
  getters: {},
  mutations: {
    setOwnFarms(state, ownFarms) {
      state.ownFarms = ownFarms
    }
  },
  actions: {
    async updateOwnFarms({state, commit}, userId) {
      const farms = await getOwnFarms(userId)
      commit('setOwnFarms', farms)
    }
  }
}