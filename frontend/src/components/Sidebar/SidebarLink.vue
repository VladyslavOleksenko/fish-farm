<template>
  <router-link :to="to" class="link" :class="{'link-active': isActive}">
    <my-icon class="link__icon" :icon-name="iconName" path-color="#eee"/>
    <transition name="fade">
      <p class="link__text" v-if="!collapsed">
        <slot/>
      </p>
    </transition>
  </router-link>
</template>

<script>
import {computed} from "vue";
import {useRoute} from "vue-router";
import {collapsed} from "./state";
import MyIcon from "@/components/UI/MyIcon";

export default {
  fileName: "SidebarLink",
  components: {MyIcon},
  props: {
    to: {type: String, required: true},
    iconName: {type: String, required: true}
  },
  setup(props) {
    const route = useRoute()
    const isActive = computed(() => route.path === props.to)
    return {isActive, collapsed}
  }
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity .1s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.link {
  height: 50px;
  padding: 0 12px;

  position: relative;
  display: flex;
  align-items: center;

  border-radius: 5px;
  text-decoration: none;

  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  transition: background-color .2s ease;
}

.link-active {
  background-color: var(--sidebar-item-active);
}

.link:hover {
  background-color: var(--sidebar-item-hover);
}

.link__icon {
  width: 25px;
  height: 25px;
  margin: 0 10px 0 0;

  flex-shrink: 0;
}

.link__text {
  font-size: 23px;
  font-weight: 400;

  overflow: hidden;
  white-space: nowrap;

  color: var(--sidebar-text-color);
}
</style>