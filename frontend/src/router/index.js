import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("@/views/Home")
  },
  {
    path: "/tasks",
    name: "Tasks",
    component: () => import("@/views/Tasks")
  },
  {
    path: "/notifications",
    name: "Notifications",
    component: () => import("@/views/Notifications")
  },
  {
    path: "/profile",
    name: "Profile",
    component: () => import("@/views/Profile")
  },
  {
    path: "/logout",
    name: "Logout",
    redirect: "/"
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
