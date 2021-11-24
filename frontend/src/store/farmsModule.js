export default {
  namespaced: true,
  state: () => ({
    farms: [
      {
        id: 1,
        name: "farm 1",
        description: "It is farm 1",
        owner_id: "1"
      },
      {
        id: 2,
        name: "farm 2",
        description: "It is farm 2",
        owner_id: "2"
      },
      {
        id: 3,
        name: "farm 3",
        description: "It is farm 3",
        owner_id: "3"
      },
      {
        id: 4,
        name: "farm 4",
        description: "It is farm 4",
        owner_id: "4"
      },
    ]
  }),
  getters: {},
  mutations: {},
  actions: {}
}