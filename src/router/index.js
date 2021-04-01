import Vue from "vue"
import VueRouter from "vue-router"
import Index from "../views/Index/Index.vue"
import Data from "../views/Data/Data.vue"
import Dashboard from "../views/Dashboard/Dashboard.vue"
import DataLink from "../views/DataLink/DataLink.vue"

Vue.use(VueRouter)

const routes = [
  {
    path: "/",
    name: "Index",
    component: Index,
    redirect: '/data',
    children: [
      {
        path: "data",
        name: "Data",
        component: Data
      },
      {
        path: "/datalink",
        name: "DataLink",
        component: DataLink
      },
      {
        path: "/dashboard",
        name: "Dashboard",
        component: Dashboard
      }

    ]
  }
]

const router = new VueRouter({
  routes,
})

export default router
