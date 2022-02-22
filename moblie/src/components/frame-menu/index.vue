<template>
  <div class="frame-menu">
    <div class="menu-item" :class="$route.path==item.path?'selected':''" v-for="item in menus" v-if="item.display">
      <a @click="$router.push(item.path)">
        {{item.name}}
      </a>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      menus: [
        { name: "首页", path: "/home", display: true },
        { name: "游戏", path: "/game", cnt: 0, display: true },
        { name: "动漫", path: "/anim", cnt: 0, display: true },
        { name: "漫画", path: "/cartoon", cnt: 0, display: true },
        { name: "小说", path: "/novel", cnt: 0, display: true },
        { name: "周边", path: "/other", cnt: 0, display: true },
        { name: "个人中心", path: "/account", display: false },
        { name: "消息中心", path: "/message", display: false },
        { name: "小黑屋", path: "/blacklist", display: false },
        { name: "搜索", path: "/search", display: false },
        { name: "收藏", path: "/collect", display: false },
        { name: "发布", path: "/publish", display: false }
      ]
    };
  },

  filters: {
    updateFilter(val) {
      if (val > 99) return "99+";
      return val;
    }
  },
  computed: {
    currentName() {
      var cur = this.menus.find(x => x.path == this.$route.path);
      if (cur) return cur.name;
      if (this.$route.path == "/topic") return "帖子";
      return "";
    }
  },
  mounted() {
    console.log(this.$route)
    this.$service.get("/public/topics/total").then(res => {
      if (!res.success) return;
      Object.keys(res.data).forEach(key => {
        var obj = this.menus.find(x => x.path == "/" + key);
        if (obj) obj.cnt = res.data[key];
      });
    });
  }
};
</script>

<style lang='less' scoped>
.frame-menu {
  font-size: 0.8rem;
  display: flex;
  padding: 0 1rem;
  box-shadow: 0 0.1rem 0.1rem #f0f0f0;
  .menu-item{
    flex: 1;
    padding: 0.5rem 0;
    border-bottom: solid 0.1rem #fff;
  }
  .selected{
    border-color: #fb7299;
  }
  a{
    text-decoration: none;
  }
}
</style>
