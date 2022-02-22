
/**
 * 保存TOKEN
 */
export const saveToken = (str) => {
  window.sessionStorage.setItem("token", str);
}

/**
 * 删除TOKEN
 */
export const removeToken = () => {
  window.sessionStorage.removeItem("token");
}

/**
 * 获取TOKEN
 */
export const getToken = () => {
  return window.sessionStorage.getItem("token");
}
