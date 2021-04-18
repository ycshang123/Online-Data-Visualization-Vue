/*
 * @Description:
 * @Author: xunmi
 * @Version: 1.0
 * @Date: 2021-04-10 16:23:40
 */
import Vue from "vue"
import App from "./App.vue"
import router from "./router"
import store from "./store"
import vuetify from "./plugins/vuetify"
import Icon from '@mdi/react'
import React from 'react'
import global from './util/Global.vue'
import VCharts from 'v-charts'

Vue.config.productionTip = false
Vue.prototype.GLOBAL = global

Vue.use(VCharts)
new Vue({
    global,
    VCharts,
    router,
    store,
    vuetify,
    Icon,
    React,
    render: (h) => h(App),
}).$mount("#app")
