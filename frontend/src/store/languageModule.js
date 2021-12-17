export default {
  namespaced: true,
  state: () => ({
    currentLanguage: "en"
  }),
  mutations: {
    setCurrentLanguage(state, currentLanguage) {
      state.currentLanguage = currentLanguage
    }
  },
  actions: {
    selectLanguage({commit}, language) {
      if (language === "ru" || language === "ua") {
        return commit("setCurrentLanguage", language)
      }
      commit("setCurrentLanguage", "en")
    }
  }
}