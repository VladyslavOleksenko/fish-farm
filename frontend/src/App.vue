<template>
  <Sidebar/>
  <div :style="{ 'margin-left:': sidebarWidth }">
    <router-view/>
  </div>
</template>

<script>
import Sidebar from "@/components/Sidebar/Sidebar";
import {sidebarWidth} from "@/components/Sidebar/state";

export default {
  components: {Sidebar},
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

#app {
  font-family: 'Montserrat', Arial, sans-serif;
}
</style>
