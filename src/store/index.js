import Vue from 'vue'
import Vuex from 'vuex'
import request from '../util/common'

Vue.use(Vuex);
//Vue.use(VueAxios, axios)

const store = new Vuex.Store({
  state: {
    getHomeData: {
      errno: 1,
      home: {}
    },
    getTopData: {
      errno: 1,
      top: {}
    },
    currentChapter: {}
  },
//同步方法
  mutations: {
    getData(state, res) {
      state.getHomeData = {...state.getHomeData, home: res.data.home};
    }
  },
  //异步获取数据，commit给mutations，mutations改变state
  actions: {
    getData(context) {
      request.get('/book/home', {}, function (res) {
        context.commit('getData', res)
      });
    }
  }
});
export default store

