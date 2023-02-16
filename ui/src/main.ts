import Vue from 'vue'
import VueRouter from 'vue-router'
import App from '@/App.vue'
import CustomerScreen from '@/views/CustomerScreen.vue'
import OperatorScreen from '@/views/OperatorScreen.vue'
import StatusScreen from '@/views/StatusScreen.vue'
import AddScreen from '@/views/AddScreen.vue'
import TestScreen from '@/views/Test.vue'
import VueMaterial from 'vue-material'


import { BootstrapVue, BootstrapVueIcons } from "bootstrap-vue"

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'

Vue.use(BootstrapVue)
Vue.use(BootstrapVueIcons)
Vue.use(VueRouter)
Vue.use(VueMaterial)


const router = new VueRouter({
  mode: "history",
  routes: [
    {
      path: "/test",
      component: TestScreen,
    },
    {
      path: "/add",
      component: AddScreen,
    },
    {
      path: "/customer",
      component: CustomerScreen,
    },
    {
      path: "/operator",
      component: OperatorScreen,
    },
    {
      path: "/",
      component: StatusScreen,
    }
  ],
})

Vue.config.productionTip = false
Vue.config.devtools = true

/* eslint-disable no-new */
new Vue({
  router,
  el: '#app',
  render: h => h(App),
})
