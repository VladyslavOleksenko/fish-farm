import { createStore } from 'vuex'
import authorizationModule from "@/store/authorizationModule";
import farmsModule from "@/store/farmsModule";

export default createStore({
  modules: {
    authorization: authorizationModule,
    farms: farmsModule
  }
})
