// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import { Button, Input, Icon, Spin, Breadcrumb, BreadcrumbItem, Row, Col,Tabs, TabPane, Card, Page, Upload,
  Dropdown, DropdownMenu, DropdownItem, Message } from 'view-design'
import 'view-design/dist/styles/iview.css'
import Vuex from 'vuex'
import store from './store'
import ApiServicePlugin from './libs/service.plugin'
import BusPlugin from './libs/bus.plugin'
import VModal from 'vue-js-modal'
Vue.component('Button', Button);
Vue.component('Input', Input);
Vue.component('Icon', Icon);
Vue.component('Spin', Spin);
Vue.component('Breadcrumb', Breadcrumb);
Vue.component('BreadcrumbItem', BreadcrumbItem);
Vue.component('TabPane', TabPane);
Vue.component('Card', Card);
Vue.component('Tabs', Tabs);
Vue.component('Row', Row);
Vue.component('Col', Col);
Vue.component('Page', Page);
Vue.component('Dropdown', Dropdown);
Vue.component('DropdownMenu', DropdownMenu);
Vue.component('DropdownItem', DropdownItem);
Vue.component('Upload', Upload);
Vue.component('Message', Message);

Vue.prototype.$Message = Message;

Vue.use(VModal)
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
