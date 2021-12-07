import {getOwnFarms} from "@/assets/js/serverRequest";

export default {
  namespaced: true,
  state: () => ({
    ownFarms: [],
    selectedTask: null,
    needToUpdateTasks: false
  }),
  getters: {},
  mutations: {
    setOwnFarms(state, ownFarms) {
      state.ownFarms = ownFarms
    },
    setSelectedTask(state, selectedTask) {
      state.selectedTask = selectedTask
    },
    setNeedToUpdateTasks(state, needToUpdateTasks) {
      state.needToUpdateTasks = needToUpdateTasks
    }
  },
  actions: {
    async updateOwnFarms({state, commit}, userId) {
      const farms = await getOwnFarms(userId)
      commit('setOwnFarms', farms)
    },
    taskUpdated({commit}) {
      commit("setNeedToUpdateTasks", true)
    }
  }
}