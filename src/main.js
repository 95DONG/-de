import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { Lazyload } from 'vant'
import Vuex from 'vuex'
Vue.config.productionTip = false

Vue.use(Lazyload)
Vue.use(Vuex)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
