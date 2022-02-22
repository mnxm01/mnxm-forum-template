<template>
  <div class="frame-header">
    <div class="frame-menu">
      <img @click="$refs.menu.show()" src="@/assets/menu.svg" alt="">
    </div>
    <div class="frame-search">
      <img src="@/assets/search.svg" alt="">
      <input type="search" v-model="searchVal" autofocus placeholder="最新游戏" @search="$bus.$emit('on-search', searchVal)">
    </div>
    <div class="frame-cancel">
      <a @click="$router.go(-1)">取消</a>
    </div>
    <account-menu ref="menu"></account-menu>
  </div>
</template>

<script>
import accountMenu from "../frame-header/menu"
export default {
  components: {
    accountMenu
  },
  data() {
    return {
      searchVal: "",
    };
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
    margin: 0 1rem 0 1rem;
    img{
      width: 1.2rem;
      height: 1.2rem;
      cursor: pointer;
    }
  }
  .frame-search{
    background-color: #f4f4f4;
    border-radius: 0.5rem;
    overflow: hidden;
    display: flex;
    cursor: pointer;
    img{
      display: block;
      width: 0.8rem;
      height: 0.8rem;
      padding: 0.2rem 0.3rem;
    }
    input{
      display: block;
      width: 12rem;
      height: 0.8rem;
      margin: 0.2rem 0.3rem 0.2rem 0.1rem;
      font-size: 0.75rem;
      line-height: 0.8rem;
      background-color: rgba(0, 0, 0, 0);
      outline: none;
      border: none;
    }
  }
  .frame-cancel{
    flex: 1;
    line-height: 0.8rem;
    padding: 0.2rem;
    padding-right: 1rem;
    text-align: right;
  }
}
</style>
