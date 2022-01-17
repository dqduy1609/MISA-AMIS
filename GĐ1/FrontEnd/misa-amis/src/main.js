// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router/route'
import Vuelidate from 'vuelidate'

import vSelect from 'vue-select'


Vue.use(Vuelidate)
Vue.component('v-select', vSelect)
Vue.config.productionTip = false


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  vSelect,
  components: { App },
  template: '<App/>'
})
