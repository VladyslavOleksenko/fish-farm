import { createStore } from 'vuex'
import authorizationModule from "@/store/authorizationModule";
import farmsModule from "@/store/farmsModule";
import userModule from "@/store/userModule";

export default createStore({
  modules: {
    authorization: authorizationModule,
    farms: farmsModule,
    user: userModule,
  }
})
