<template>
  <div class="sidebar" :style="{ width: sidebarWidth }">
    <SidebarTitle class="sidebar__title" @click="toggleSidebar"></SidebarTitle>

    <SidebarLink class="sidebar__link" to="/" icon-name="home">Home</SidebarLink>
    <SidebarLink class="sidebar__link" to="/tasks" icon-name="tasks">Tasks</SidebarLink>
    <SidebarLink class="sidebar__link" to="/notifications" icon-name="notifications">Notifications</SidebarLink>
    <SidebarLink class="sidebar__link" to="/profile" icon-name="profile">Profile</SidebarLink>
  </div>
</template>

<script>
import SidebarLink from "./SidebarLink";
import {collapsed, toggleSidebar, sidebarWidth} from "@/components/Sidebar/state";
import MyIcon from "@/components/UI/MyIcon";
import SidebarTitle from "@/components/Sidebar/SidebarTitle";

export default {
  fileName: "Sidebar",
  components: {SidebarTitle, MyIcon, SidebarLink},
  setup() {
    return {collapsed, toggleSidebar, sidebarWidth}
  }
}
</script>

<style>
:root {
  --sidevar-bg-color: #2f855a;
  --sidebar-item-hover: #38a169;
  --sidebar-item-active: #276749;
  --sidebar-text-color: #efefef;
  --sidebar-transition: .3s ease;
}
</style>

<style scoped>
.sidebar {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  float: left;
  z-index: 15;
  padding: 10px;

  display: flex;
  flex-direction: column;

  background-color: var(--dark-purple-color);

  transition: var(--sidebar-transition);
}

.sidebar__title {
  margin: 0 0 50px 0;
}

.sidebar__link {
  margin: 0 0 5px 0;
}
</style>