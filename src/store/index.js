import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'
Vue.use(Vuex)
// 把数据存储到本地
const vuexLocal = new VuexPersistence({
  storage: window.localStorage
})

export default new Vuex.Store({
  state: {
    user: {
      token: null,
      cityobj: {},
      MapInfo: []
    }
  },
  getters: {
  },
  mutations: {
    setUser (state, payload) {
      state.user.token = payload
    },
    setCityObj (state, payload) {
      state.user.cityobj = payload
    },
    // 存放第一次地图信息
    setMapInfo (state, payload) {
      state.MapInfo = payload
    }
  },
  actions: {
  },
  modules: {
  },
  plugins: [vuexLocal.plugin]
})
