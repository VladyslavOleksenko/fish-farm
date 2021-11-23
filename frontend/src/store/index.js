import { createStore } from 'vuex'
import {authorizationModule} from "@/store/authorizationModule";

export default createStore({
  modules: {
    authorization: authorizationModule
  }
})
