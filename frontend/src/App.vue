<template>
  <div v-if="authorizationStatus">
    <Sidebar/>
    <div id="page-body" :style="{'margin-left': sidebarWidth}">
      <router-view/>
    </div>
  </div>
  <div v-else>
    <Authorization/>
  </div>
</template>

<script>
import Sidebar from "@/components/Sidebar/Sidebar";
import {sidebarWidth} from "@/components/Sidebar/state";
import Authorization from "@/views/Authorization"
import {mapGetters, mapMutations} from "vuex"


export default {
  components: {Sidebar, Authorization},
  computed: {
    ...mapGetters({
      authorizationStatus: "authorization/getAuthorizationStatus"
    })
  },
  methods: {
    ...mapMutations({
      setToken: "authorization/setToken",
      setUser: "user/setUser"
    })
  },
  setup() {
    return {sidebarWidth}
  },
  mounted() {
    if (!localStorage.token || !localStorage.user) {
      console.log("No correct info in localStorage")
      return
    }

    this.setToken(localStorage.token)
    this.setUser(JSON.parse(localStorage.user))
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
}

#app, button, input, textarea {
  font-family: 'Montserrat', Arial, sans-serif;
}

#page-body {
  min-height: 100vh;

  transition: var(--sidebar-transition);
  background-color: var(--light-gray-color);
}
</style>
