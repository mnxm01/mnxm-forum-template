// initial state
const state = {
  unread: [],
  unreadTotal: 0,
  unreadCurrent: 1,
  unreadSize: 10,

  read: [],
  readTotal: 0,
  readCurrent: 1,
  readSize: 10,
}

// getters
const getters = {
  unread(state) {
    return state.unread;
  },
  unreadCanLoadMore(state) {
    return !(state.unreadCurrent * state.unreadSize >= state.unreadTotal);
  },
  unreadTotal(state) {
    return state.unreadTotal;
  },
  read(state) {
    return state.read;
  },
  readCanLoadMore(state) {
    return !(state.readCurrent * state.readSize >= state.readTotal);
  },
  readTotal(state) {
    return state.readTotal;
  },
}

// actions
const actions = {
  initUnread(context) {
    context.commit("saveUnread", []);
    context.commit("saveUnreadCurrent", 1)
    context.dispatch("fetchUnread");
  },
  nextUnread(context) {
    context.commit("saveUnreadCurrent", context.state.unreadCurrent + 1)
    context.dispatch("fetchUnread");
  },
  fetchUnread(context) {
    return this._vm.$service.get("/auth/topics/unread_messages", {
      account: context.rootGetters["account/get"].account,
      skip: (context.state.unreadCurrent - 1) * context.state.unreadSize,
      limit: context.state.unreadSize
    })
      .then(res => {
        if (!res.success) {
          this.$toast.top(res.msg);
          return;
        }
        res.data.items.forEach(item => {
          item.content = item.content.replace(/<img\b.*?(?:\>|\/>)/g, "[图片]");
        });
        context.commit("saveUnread", [...context.state.unread, ...res.data.items]);
        context.commit("saveUnreadTotal", res.data.count);
        return res;
      })
      .catch(err => {
        this._vm.$toast.top(err.msg);
      });
  },

  saveRead(context, payload){
    return this._vm.$service.post("/auth/topics/save_read", {
      _id: payload
    })
      .then(res => {
        context.commit("saveUnread", []);
        context.commit("saveRead", []);
        context.dispatch("fetchUnread");
        context.dispatch("fetchRead");
      })
      .catch(err => {
        this._vm.$toast.top(err.msg);
      });
  },
  
  initRead(context) {
    context.commit("saveRead", []);
    context.commit("saveReadCurrent", 1)
    context.dispatch("fetchRead");
  },
  nextRead(context) {
    context.commit("saveReadCurrent", context.state.readCurrent + 1)
    context.dispatch("fetchRead");
  },
  fetchRead(context) {
    return this._vm.$service.get("/auth/topics/read_messages", {
      account: context.rootGetters["account/get"].account,
      skip: (context.state.readCurrent - 1) * context.state.readSize,
      limit: context.state.readSize
    })
      .then(res => {
        if (!res.success) {
          this.$toast.top(res.msg);
          return;
        }
        res.data.items.forEach(item => {
          item.content = item.content.replace(/<img\b.*?(?:\>|\/>)/g, "[图片]");
        });
        context.commit("saveRead", [...context.state.read, ...res.data.items]);
        context.commit("saveReadTotal", res.data.count);
        return res;
      })
      .catch(err => {
        this._vm.$toast.top(err.msg);
      });
  },
}

// mutations
const mutations = {
  saveUnread(state, payload) {
    state.unread = payload;
  },
  saveUnreadTotal(state, payload) {
    state.unreadTotal = payload;
  },
  saveUnreadCurrent(state, payload) {
    state.unreadCurrent = payload;
  },
  saveRead(state, payload) {
    state.read = payload;
  },
  saveReadTotal(state, payload) {
    state.readTotal = payload;
  },
  saveReadCurrent(state, payload) {
    state.readCurrent = payload;
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}