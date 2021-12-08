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
    taskDeleted({commit}) {
      commit("setNeedToUpdateTasks", true)
    },
    taskArrayUpdated({commit}) {
      commit("setNeedToUpdateTasks", false)
      commit("setSelectedTask", null)
    }
  }
}