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
    component: () => import("@/views/TaskView")
  },
  {
    path: "/profile",
    name: "Profile",
    component: () => import("@/views/Profile")
  },
  {
    path: "/farm/:farmId",
    name: "Farm",
    component: () => import("@/views/Farm"),
    params: true
  },
  {
    path: "/dashboard/:farmId",
    name: "Dashboard",
    component: () => import("@/views/Dashboard")
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
