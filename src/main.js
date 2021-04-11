import Vue from "vue"
import App from "./App.vue"
import router from "./router"
import store from "./store"
import vuetify from "./plugins/vuetify"
import Icon from '@mdi/react'
import React, { Component } from 'react'
import global from './util/Global.vue'

Vue.config.productionTip = false
Vue.use(global)
Vue.prototype.GLOBAL = global

new Vue({
    router,
    store,
    vuetify,
    Icon,
    React,
    render: (h) => h(App),
}).$mount("#app")
