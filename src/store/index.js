import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
//import VueAxios from 'vue-axios'

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
    }
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
      let baseUrl = process.env.DOMAIN;
      axios({
        method: 'get',
        url: baseUrl + '/book/home',
        data: ''
      }).then(function (res) {
        context.commit('getData', res)
      }).catch(function (err) {
        console.log(err)
      })
    }
  }
});
export default store

