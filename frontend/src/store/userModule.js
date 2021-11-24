export default {
  namespaced: true,
  state: () => ({
    user: {}
  }),
  mutations: {
    setUser(state, user) {
      if (!user || !user.userId || !user.email || !user.firstName ||
        !user.lastName
      ) {
        console.log("cant set user to storage from vuex")
        return
      }

      state.user = user
      localStorage.user = JSON.stringify(user)
    }
  }
}