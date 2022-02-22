import Vue from "vue"

var BusPlugin = {};

BusPlugin.install = function (Vue) {
  Vue.prototype.$bus = new Vue();
}

export default BusPlugin;