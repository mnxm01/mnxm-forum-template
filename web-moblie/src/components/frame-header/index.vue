<template>
  <div class="frame-header">
    <div class="frame-menu">
      <img @click="$refs.menu.show()" src="@/assets/menu.svg" alt="">
    </div>
    <div class="frame-search" @click="$router.push('/search?val=')">
      <img src="@/assets/search.svg" alt="">
      <div>最新游戏</div>
    </div>
    <div v-if="$store.getters['account/get']" class="frame-message">
      <a @click="$router.push('/message')">消息({{$store.getters['message/unread'].length}})</a>
    </div>
    <div v-else class="frame-login">
      <a @click="$router.push('/login')">登录</a>
    </div>
    <account-menu ref="menu"></account-menu>
  </div>
</template>

<script>
import accountMenu from "./menu"
export default {
  components: {
    accountMenu
  },
  data() {
    return {};
  },
};
</script>

<style lang='less' scoped>
.frame-header{
  font-size: 0.8rem;
  line-height: 0rem;
  vertical-align: middle;
  display: flex;
  padding: 1rem 0;
  text-align: left;
  .frame-menu{
    margin: 0 2rem 0 1rem;
    img{
      width: 1.2rem;
      height: 1.2rem;
      cursor: pointer;
    }
  }
  .frame-search{
    background-color: #f4f4f4;
    border-radius: 0.5rem;
    display: flex;
    min-width: 11rem;
    cursor: pointer;
    img{
      display: block;
      width: 0.8rem;
      height: 0.8rem;
      padding: 0.2rem 0.3rem;
    }
    div{
      display: block;
      height: 0.8rem;
      padding: 0.2rem 1rem 0.2rem 0.1rem;
      font-size: 0.75rem;
      line-height: 0.8rem;
    }
  }
  .frame-login,.frame-message{
    font-size: 0.75rem;
    width: 3rem;
    line-height: 1.2rem;
    text-align: right;
  }
}
</style>
