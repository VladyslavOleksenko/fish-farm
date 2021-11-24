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
      try {
        const serverResponse = await getOwnFarms(userId)
        if (serverResponse.farms && serverResponse.farms.length) {
          return commit('setOwnFarms', serverResponse.farms)
        }
        commit('setOwnFarms', [])
      } catch (exception) {
        console.log("Can't update own farms")
        console.log(exception)
      }
    }
  }
}