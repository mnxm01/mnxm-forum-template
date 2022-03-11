// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Vuex from 'vuex'
import store from './store'
import ApiServicePlugin from './libs/service.plugin'
import BusPlugin from './libs/bus.plugin'
import 'vue2-toast/lib/toast.css';
import Toast from 'vue2-toast';

Vue.use(Toast, { duration: 2000 });
Vue.use(ApiServicePlugin);
Vue.use(BusPlugin);
Vue.use(Vuex);
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
