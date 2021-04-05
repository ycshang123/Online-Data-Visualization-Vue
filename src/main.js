import Vue from "vue"
import App from "./App.vue"
import router from "./router"
import store from "./store"
import vuetify from "./plugins/vuetify"
import Icon from '@mdi/react'
import React, { Component } from 'react'


Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  Icon,
  React,
  render: (h) => h(App),
}).$mount("#app")
