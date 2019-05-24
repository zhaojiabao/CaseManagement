// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuex from 'vuex'
import store from './vuex/store'
import 'babel-polyfill'
import './util/css/common.css'
import iView from 'iview';
import 'iview/dist/styles/iview.css';
import util from './util/js/util'
import VueAreaLinkage from 'vue-area-linkage'
import 'vue-area-linkage/dist/index.css'
Vue.use(VueAreaLinkage)
Vue.use(iView);
Vue.use(Vuex)
Vue.config.productionTip = false
Vue.prototype.util = util;
import axios from 'axios'

Vue.prototype.$Message.config({
    duration: 2
});

//axios.defaults.withCredentials = true;
//axios.defaults.baseURL =  util.getDefaultSrc(); 


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})

router.beforeEach((to,from,next)=>{
   	sessionStorage.setItem('frompath',from.fullPath)
  	next();
})
