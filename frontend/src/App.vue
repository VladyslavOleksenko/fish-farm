<template>
  <div v-if="this.$store.state.authorization.authorizationStatus">
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

export default {
  components: {Sidebar, Authorization},
  setup() {
    return {sidebarWidth}
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
  transition: var(--sidebar-transition)
}
</style>
