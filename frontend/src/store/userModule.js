export default {
  namespaced: true,
  state: () => ({
    user: {}
  }),
  mutations: {
    setUser(state, user) {
      if (!user ||
        !user["user_id"] ||
        !user.email ||
        !user["first_name"] ||
        !user["last_name"]
      ) {
        console.log("cant set user to storage from vuex")
        return
      }

      const newUserObject = {
        userId: user["user_id"],
        email: user.email,
        firstName: user["first_name"],
        lastName: user["last_name"]
      }
      state.user = newUserObject
      localStorage.user = JSON.stringify(newUserObject)
    }
  }
}