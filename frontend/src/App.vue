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
import {mapGetters} from "vuex"


export default {
  components: {Sidebar, Authorization},
  computed: {
    ...mapGetters({
      authorizationStatus: "authorization/getAuthorizationStatus"
    })
  },
  setup() {
    return {sidebarWidth}
  },
  mounted() {
    if (localStorage.token) {
      this.$store.commit('authorization/setToken', localStorage.token)
    }
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

#app, button, input {
  font-family: 'Montserrat', Arial, sans-serif;
}

#page-body {
  min-height: 100vh;

  transition: var(--sidebar-transition);
  background-color: var(--light-gray-color);
}
</style>
