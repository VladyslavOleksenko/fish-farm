<template>
  <div class="sidebar" :style="{ width: sidebarWidth }">
    <SidebarTitle class="sidebar__title" @click="toggleSidebar"></SidebarTitle>

    <div class="sidebar__links">
      <SidebarLink class="sidebar__link" to="/" icon-name="home">
        {{ textResource.home }}
      </SidebarLink>
      <SidebarLink class="sidebar__link" to="/tasks" icon-name="tasks">
        {{ textResource.tasks }}
      </SidebarLink>
      <SidebarLink class="sidebar__link" to="/profile" icon-name="profile">
        {{ textResource.profile }}
      </SidebarLink>
    </div>

    <div class="sidebar__language language">
      <button
        class="language__button"
        :class="{'language__button-active': currentLanguage === 'en'}"
        @click="selectLanguage('en')">
        EN
      </button>
      <button
        class="language__button"
        :class="{'language__button-active': currentLanguage === 'ua'}"
        @click="selectLanguage('ua')">
        UA
      </button>
      <button
        class="language__button"
        :class="{'language__button-active': currentLanguage === 'ru'}"
        @click="selectLanguage('ru')">
        RU
      </button>
    </div>

    <div class="sidebar__logout-wrapper">
      <SidebarLink class="sidebar__link" to="/logout" icon-name="logout"
                   @click="logout">
        {{ textResource.logout }}
      </SidebarLink>
    </div>
  </div>
</template>

<script>
import SidebarLink from "./SidebarLink";
import {
  collapsed,
  toggleSidebar,
  sidebarWidth
} from "@/components/Sidebar/state";
import MyIcon from "@/components/UI/MyIcon";
import SidebarTitle from "@/components/Sidebar/SidebarTitle";
import {mapState, mapActions} from "vuex";

export default {
  fileName: "Sidebar",
  components: {SidebarTitle, MyIcon, SidebarLink},
  setup() {
    return {collapsed, toggleSidebar, sidebarWidth}
  },
  computed: {
    ...mapState({
      currentLanguage: state => state.language.currentLanguage
    }),
    textResource() {
      if (this.currentLanguage === "en") {
        return {
          home: "Home",
          tasks: "Tasks",
          profile: "Profile",
          logout: "Logout",
        }
      }
      if (this.currentLanguage === "ua") {
        return {
          home: "Головна",
          tasks: "Задачі",
          profile: "Профіль",
          logout: "Вийти",
        }
      }
      if (this.currentLanguage === "ru") {
        return {
          home: "Главная",
          tasks: "Задачи",
          profile: "Профиль",
          logout: "Выйти",
        }
      }
    }
  },
  methods: {
    ...mapActions({
      logout: "authorization/logout",
      selectLanguage: "language/selectLanguage"
    })
  }
}
</script>

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


.sidebar__links {
  flex: 1 1 auto;
}

.sidebar__link {
  margin: 0 0 5px 0;
}


.sidebar__language {
  margin: 0 0 20px 0;

  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}

.language__button {
  width: 50px;
  height: 50px;
  margin: 0 0 10px 0;

  font-size: 23px;
  font-weight: 400;

  color: var(--sidebar-text-color);
  border-radius: 5px;
  border: none;
  background: none;

  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  transition: background-color .2s ease;
}

.language__button:hover {
  background-color: var(--light-purple-color);
}

.language__button-active {
  background-color: var(--blue-color);
}

.language__button-active:hover {
  background-color: var(--blue-color);
}
</style>