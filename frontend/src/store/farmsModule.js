import {getTaskHistory} from "@/assets/js/serverRequest";

export default {
  namespaced: true,
  state: () => ({
    selectedTask: null,
    selectedTaskHistory: [],
    needToUpdateTasks: false
  }),
  mutations: {
    setSelectedTask(state, selectedTask) {
      state.selectedTask = selectedTask
    },
    setSelectedTaskHistory(state, selectedTaskHistory) {
      state.selectedTaskHistory = selectedTaskHistory
    },
    setNeedToUpdateTasks(state, needToUpdateTasks) {
      state.needToUpdateTasks = needToUpdateTasks
    },
  },
  actions: {
    taskDeleted({commit}) {
      commit("setNeedToUpdateTasks", true)
    },
    taskArrayUpdated({commit}) {
      commit("setNeedToUpdateTasks", false)
      commit("setSelectedTask", null)
    },
    async updateSelectedTaskHistory({state, commit}) {
      if (!state.selectedTaskHistory) {
        return commit("setSelectedTaskHistory", [])
      }
      const selectedTaskId = state.selectedTask.task.taskId
      const selectedTaskHistory = await getTaskHistory(selectedTaskId)
      commit("setSelectedTaskHistory", selectedTaskHistory)
    }
  }
}