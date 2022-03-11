import Env from './env';

let config = {

    //开发
    //登录
    commonBaseUrl: "http://localhost:10000/api",
    // commonBaseUrl: location.origin + "/api",
    // commonBaseUrl: "http://mnxm.work:20001/api",

    //密钥
    key: "demo",
    env: Env,
};

export const accountTypeDic = {
  admin: "管理员",
  senior: "高级会员",
  ordinary: "注册会员",
  denied: "禁止发言"
};


export const dateFilter = (val) => {
  if(val){
    var date = new Date(val);
    var month = date.getMonth() + 1;
    var day = date.getDay() + 1;
    return date.getFullYear() + "-" +
      (month <= 9 ? "0" + month : month) + "-" +
      (day <= 9 ? "0" + day : day);
  }
  return "";
}

export const dateTimeFilter = (val) => {
  if (val) {
    var date = new Date(val);
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDay() + 1;
    var hour = date.getHours();
    var min = date.getMinutes();
    return date.getFullYear() + "-" +
      (month <= 9 ? "0" + month : month) + "-" +
      (day <= 9 ? "0" + day : day) + " " +
      (hour <= 9 ? "0" + hour : hour) + ":" +
      (min <= 9 ? "0" + min : min);
  }
  return "";
}

export default config;