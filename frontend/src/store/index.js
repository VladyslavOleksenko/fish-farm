import { createStore } from 'vuex'
import authorizationModule from "@/store/authorizationModule";
import farmsModule from "@/store/farmsModule";
import userModule from "@/store/userModule";
import languageModule from "@/store/languageModule";

export default createStore({
  modules: {
    authorization: authorizationModule,
    farms: farmsModule,
    user: userModule,
    language: languageModule
  }
})
