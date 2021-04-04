import Vue from "vue"
import VueRouter from "vue-router"
import About from '../views/About.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: "/index",
    name: "about",
    component: About
  },
  {
    path: "/",
    name: "home",
    component: () => import('../views/Home.vue')
  }
]

const router = new VueRouter({
  routes,
})

export default router
