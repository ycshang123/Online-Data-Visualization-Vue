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
