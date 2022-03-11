import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

import account from './account'
import message from './message'

export default new Vuex.Store({
  modules: {
    account: account,
    message: message,
    permissions: []
  }
})