import Vue from "vue"
import VueRouter from "vue-router"
import Index from "../views/Index/Index.vue"
import Data from "../views/Data/Data.vue"
import Dashboard from "../views/Dashboard/Dashboard.vue"

Vue.use(VueRouter)

const routes = [
    {
        path: "/",
        name: "Index",
        component: Index,
        redirect: '/data',
        children: [
            {
                path: "/data",
                name: "Data",
                component: Data
            },
            {
                path: "/datalink",
                name: "DatabaseConn",
                component: () => import('../views/DataLink/DatabaseConn.vue')
            },
            {
                path: "/dashboard",
                name: "Dashboard",
                component: Dashboard
            },
            {
                path: "/addtable",
                name: "AddTable",
                component: () => import('../views/Data/AddTable.vue')
            },
            {
                path: "/uploadfiles",
                name: "UpLoadFiles",
                component: () => import('../views/Data/UploadFiles.vue')
            }

        ]
    }
]

const router = new VueRouter({
    routes,
})

export default router
