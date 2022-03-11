import { saveToken, removeToken } from "@/libs/utils.js";

// initial state
const state = {
  info: null
}

// getters
const getters = {
  get(state) {
    return state.info
  },
  getAccount(state) {
    return state.info ? state.info.account : " ";
  },
}

// actions
const actions = {
  login(context, payload) {
    return this._vm.$service
      .post("/public/account/login", {
        account: payload.account,
        password: payload.password
      })
      .then(res => {

        if (!res.success) {
          this._vm.$toast.top(res.msg);
          return res;
        }
        saveToken(res.data.authorization);
        return res;
      });
  },
  init(context) {
    return this._vm.$service.get("/auth/account/current")
      .then(res => {
        if (!res.success) {
          this.$toast.top(res.msg);
          return;
        }
        context.commit("save", res.data);
        context.dispatch("message/initUnread", {}, { root: true })
        context.dispatch("message/initRead", {}, { root: true })
        return res;
      })
      .catch(err => {
        context.commit("save", null);
        removeToken();
        this._vm.$toast.top(err.msg);
      });
  },
  logout(context) {
    return this._vm.$service
      .post("/auth/account/logout", {})
      .then(res => {
        removeToken();
        context.commit("save", null);
      })
      .catch(err => {
        this._vm.$toast.top(err.msg);
      });
  },
  delete(context) {
    removeToken();
    context.commit("save", null);
  },
}

// mutations
const mutations = {
  save(state, payload) {
    state.info = payload;
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}