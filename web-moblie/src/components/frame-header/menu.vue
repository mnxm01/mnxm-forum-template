<template>
  <div>
    <div v-show="showMenu" class="frame-menu-layer">
      <ul class="menu-content">
        <li class="header">
          <img src="@/assets/default-avatar.gif" alt />
          <label v-if="$store.getters['account/get']">{{$store.getters['account/getAccount']}}</label>
          <label v-else @click="$router.push('/login')">登录</label>
        </li>
        <li @click="to('/home')">首&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;页</li>
        <li v-if="$store.getters['account/get']" @click="to('/account')">个人中心</li>
        <li v-if="$store.getters['account/get']" @click="to('/message')">消息中心</li>
        <li v-if="$store.getters['account/get']" @click="to('/publish')">我的发布</li>
      </ul>
      <div class="menu-layer" @click="showMenu=!showMenu"></div>
    </div>
  </div>
</template>

<script>
import headerFunc from "./header-func";
export default {
  data() {
    return {
      showMenu: false
    };
  },
  methods: {
    show() {
      this.showMenu = true;
    },
    to(path) {
      this.$router.push(path);
      this.$nextTick(() => {
        this.showMenu = false;
      });
    }
  },
  mounted() {}
};
</script>

<style lang='less' scoped>
.frame-menu-layer {
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  z-index: 9999;
  display: flex;
  .menu-content {
    width: 50%;
    background-color: #48525f;
    animation: kfmenu 0.3s;
    white-space: nowrap;
    overflow-x: hidden;
    overflow-y: auto;
    color: #fff;
    li.header {
      height: 3rem;
      display: flex;
      padding: 1rem;
      img {
        min-width: 3rem;
        height: 3rem;
        width: 3rem;
        border-radius: 1.5rem;
      }
      label {
        line-height: 3rem;
        padding: 0 1rem;
      }
    }
    li {
      padding: 0.5rem 1rem;
      line-height: 1rem;
      text-align: left;
    }
  }
  @keyframes kfmenu {
    from {
      opacity: 0;
      width: 30%;
    }
    to {
      opacity: 1;
      width: 50%;
    }
  }
  .menu-layer {
    flex: 1;
    opacity: 0.4;
    background-color: #000;
    animation: kflayer 0.3s;
  }
  @keyframes kflayer {
    from {
      opacity: 0;
    }
    to {
      opacity: 0.4;
    }
  }
}
</style>
