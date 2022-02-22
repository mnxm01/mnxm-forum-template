
import { getToken, removeToken, removeUserInfo } from "./utils";
import config from "./config";
import axios from "axios";

var ApiServicePlugin = {};

ApiServicePlugin.install = function (Vue) {

  var fetch = (url, data, type, tokenInvalidCallback) => {

    data = data ? data : {};
    type = type.toUpperCase();

    return new Promise((resolve, reject) => {

      let dataStr = ''; //数据拼接字符串
      let sendData = {};

      Object.keys(data).forEach(key => {
        if (typeof (data[key]) == "object") {
          sendData = data[key];
        }
        else {
          dataStr += key + '=' + data[key] + '&';
        }
      })

      if (dataStr !== '') {
        dataStr = dataStr.substr(0, dataStr.lastIndexOf('&'));
        url = url + '?' + dataStr;
      }

      const instance = axios.create({
        baseURL: url,
        timeout: 10000,
        headers: {
          "Authorization": getToken(),
          "Accept": "application/json",
          "Content-type": "application/json"
        }
      });

      instance({
        method: type,
        url: url,
        data: sendData
      })
        .then((response) => {
          resolve(response.data);
        })
        .catch(res => {
          if (res.response && res.response.status == 401) tokenInvalidCallback();
        })
    });
  };

  var sendFile = (url, data, tokenInvalidCallback) => {
    
    return new Promise((resolve, reject) => {

      var param = new FormData();

      Object.keys(data).forEach(key => {
        if (typeof (data[key]) == "object") {
          param.append('file', data[key], data[key].name);
        }
        else {
          param.append(key, data[key]);
        }
      })

      const instance = axios.create({
        baseURL: url,
        timeout: 10000,
        headers: {
          "Authorization": getToken(),
          "Accept": "application/json",
          'Content-Type': 'multipart/form-data'
        }
      });

      instance({
        method: "POST",
        url: url,
        data: param
      })
        .then((response) => {
          resolve(response.data);
        })
        .catch(res => {
          if (res.response && res.response.status == 401) tokenInvalidCallback();
        })
    });
  };

  Vue.prototype.$service = {

    tokenInvalidCallback: () => { 
      removeToken();
    },

    get: function (url, data) {
      url = config.commonBaseUrl + url;
      return fetch(url, data, "GET", this.tokenInvalidCallback);
    },

    post: function (url, data) {
      url = config.commonBaseUrl + url;
      return fetch(url, data, "POST", this.tokenInvalidCallback);
    },

    sendFile: function (url, data) {
      url = config.commonBaseUrl + url;
      return sendFile(url, data, this.tokenInvalidCallback);
    },
  }

}

export default ApiServicePlugin;