import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  // 定义状态
  state: {
    author: 'Wise Wrong',
    length:0,
    width:0,
    typeChange:'',
    qingjingChange:'',
    nowselectdDIsasterBearing:0,
    username:0,
    duration:2,
  }
})

export default store