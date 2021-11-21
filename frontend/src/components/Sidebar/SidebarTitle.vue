<template>
  <div class="title">
    <my-icon class="title__icon" icon-name="menu" path-color="#fff"/>
    <div class="title__text" v-if="!collapsed">FISH Farm</div>
  </div>
</template>

<script>
import MyIcon from "@/components/UI/MyIcon";
import {collapsed} from "@/components/Sidebar/state";

export default {
  name: "SidebarTitle",
  components: {MyIcon},
  setup() {
    return {collapsed}
  }
}
</script>

<style scoped>
.title {
  height: 50px;
  padding: 0 12px;

  position: relative;
  display: flex;
  align-items: center;

  border-radius: 5px;

  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  transition: background-color .2s ease;
}

.title:hover {
  background-color: var(--sidebar-item-hover);
}

.title__icon {
  display: block;
  width: 25px;
  height: 25px;
  margin: 0 10px 0 0;

  flex-shrink: 0;
}

.title__text {
  font-size: 23px;
  font-weight: 500;

  overflow: hidden;
  white-space: nowrap;

  color: var(--sidebar-text-color);
}
</style>