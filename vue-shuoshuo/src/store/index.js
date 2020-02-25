import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currentSearchKeyword: null,
    num: 0,
    count:0,
    timers :[]
  },
  mutations: {
    setCurrentSearchKeyword(state, param) {
      state.currentSearchKeyword = param.value;
    },
    numcount(state, pay) {
      state.num += pay;
    },
    resizenum(state) {
      state.num = 0;
    },
    countadd(state){
      state.count ++ ;
    },
    resizecount(state) {
      state.count = 0;
    },
    recount(state,pay) {
      state.count = pay;
    },

  },
  actions: {},
  modules: {}
})