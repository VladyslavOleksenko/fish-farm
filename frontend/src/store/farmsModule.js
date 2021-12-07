import {getOwnFarms} from "@/assets/js/serverRequest";

export default {
  namespaced: true,
  state: () => ({
    selectedTask: null,
    needToUpdateTasks: false
  }),
  mutations: {
    setSelectedTask(state, selectedTask) {
      state.selectedTask = selectedTask
    },
    setNeedToUpdateTasks(state, needToUpdateTasks) {
      state.needToUpdateTasks = needToUpdateTasks
    }
  },
  actions: {
    taskUpdated({commit}) {
      commit("setNeedToUpdateTasks", true)
    }
  }
}