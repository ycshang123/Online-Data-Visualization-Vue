/*
 * @Description:
 * @Author: xxq
 * @Version: 1.0
 * @Date: 2021-04-12 21:47:30
 */
import Vue from "vue"
import VueRouter from "vue-router"
import Index from "../views/Index/Index.vue"
import Data from "../views/Data/Data.vue"
import Dashboard from "../views/Dashboard/Dashboard.vue"
import Login from "../views/Login/login.vue"

Vue.use(VueRouter)

const routes = [

    {
        path: "/about",
        name: 'About',
        component: () => import('../views/About.vue')
    },
    {
        path: "/",
        name: "Index",
        component: Index,
        redirect: '/datalink',
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
                path: "/selfdata",
                name: "SelfData",
                component: () => import('../views/Data/SelfData.vue')
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
            },
            {
                path: "/object",
                name: "Object",
                component: () => import('../views/Dashboard/Object.vue')
            }

        ]
    },
    {
        path: "/login",
        name: "Login",
        component: Login
    },
]

const router = new VueRouter({
    routes,
})

export default router
