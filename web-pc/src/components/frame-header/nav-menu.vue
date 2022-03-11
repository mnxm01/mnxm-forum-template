<template>
  <div class="nav-menu">
    <div class="nav-wrap">
      <div class="nav-wrap-left">
        <ul>
          <li @click="setHome">设为首页</li>
          <li @click="addFavorite">收藏本站</li>
        </ul>
      </div>
      <div class="nav-wrap-right">
        <ul v-if="$store.getters['account/get']" class="nav-wrap-right-list">
          <li class="nav-wrap-right-list-item">
            <Dropdown style="display: block;" @on-click="execCommand">
              <a href="javascript:void(0)">
                <img src="@/assets/default-avatar.gif" alt />
              </a>
              <DropdownMenu slot="list">
                <DropdownItem name="account">账户</DropdownItem>
                <DropdownItem name="publish">发布</DropdownItem>
                <DropdownItem name="logout">退出</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </li>
          <li
            class="nav-wrap-right-list-item"
            @click="$router.push('/message')"
            style="margin-right: 0;"
          >消息({{$store.getters['message/unreadTotal']}})</li>
        </ul>
        <ul v-else class="nav-wrap-right-list">
          <li class="nav-wrap-right-list-item" @click="$refs.login&&$refs.login.show()">登录</li>
          <li
            class="nav-wrap-right-list-item"
            @click="$router.push('/regist')"
            style="margin-right: 0;"
          >注册</li>
        </ul>
      </div>
    </div>
    <login ref="login"></login>
  </div>
</template>

<script>
import frameMenu from "../frame-menu";
import headerFunc from "./header-func";
import login from "../login";
export default {
  components: { login },
  data() {
    return {};
  },
  methods: {
    execCommand(name) {
      if (name == "account") {
        this.$router.push("/account");
        return;
      }
      if (name == "collect") {
        this.$router.push("/collect");
        return;
      }
      if (name == "publish") {
        this.$router.push("/publish");
        return;
      }
      if (name == "logout") {
        this.$store.dispatch("account/logout").then(res => {
          this.$router.replace("/home");
        });
        return;
      }
    },
    ...headerFunc
  },
  mounted() {
    this.$bus.$on("show-login", () => {
      this.$refs.login.show();
    });
  }
};
</script>

<style lang='less' scoped>

    .nav-menu{
      position: relative;
      z-index: 200;
      height: 42px;
      background-color: hsla(0,0%,100%,.4);
      box-shadow: 0 1px 2px rgba(0,0,0,.1);
      .nav-wrap{
        min-width: 980px;
        height: 42px;
        margin: 0 auto;
        display: flex;
        justify-content: space-between;
        .nav-wrap-left{
          display: block;
          flex-direction: row;
          ul{
            display: flex;
            height: 42px;
            line-height: 42px;
            li{
              cursor: pointer;
              margin-right: 15px;
            }
          }
        }
        .nav-wrap-right{
          display: flex;
          flex-direction: row;
          ul.nav-wrap-right-list{
            display: flex;
            height: 42px;
            line-height: 42px;
            font-size: 12px;
            li.nav-wrap-right-list-item{
              cursor: pointer;
              margin-right: 20px;
              img{
                height: 32px;
                margin: 5px 0;
                border-radius: 16px;
              }
            }
          }
        }
      }
      .nav-wrap{
        width: 1160px;
      }
      @media screen and (max-width: 1400px){
        .nav-wrap{
          width: 980px;
        }
      }
    }
</style>
