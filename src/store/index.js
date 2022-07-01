import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {
      token: null
    }
  },
  getters: {
  },
  mutations: {
    setUser (state, payload) {
      state.user.token = payload
    }
  },
  actions: {
  },
  modules: {
  }
})
