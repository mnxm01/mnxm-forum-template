<template>
    <div class="frame-menu">
      <div class="primary-menu">
        <div class="primary-wrap">
          <div class="primary-wrap-left">
            <ul>
              <li v-for="item in menus" :key="item.name" @click="$router.push(item.path)" v-if="item.display">
                <Icon v-if="item.icon" type="md-home" size="20" color="#ffafc9" />
                <div v-else class="update">{{ item.cnt | updateFilter}}</div>
                <div :class="$route.path==item.path?'current':''">{{item.name}}</div>
              </li>
            </ul>
          </div>
          <div class="primary-wrap-right">
            <ul>
              <li @click="$router.push('/blacklist')">
                <Icon type="md-lock" size="20" />
                <div>小黑屋</div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div v-if="$route.path!='/home'" class="bread-card">
        <Breadcrumb>
          <BreadcrumbItem to="/">论坛</BreadcrumbItem>
          <BreadcrumbItem>{{currentName}}</BreadcrumbItem>
        </Breadcrumb>
      </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      menus: [
        { name: "首页", path: "/home", icon: "md-home", display: true },
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
        { name: "发布", path: "/publish", display: false },
      ]
    };
  },
  
  filters: {
    updateFilter(val) {
      if (val > 99) return "99+";
      return val;
    }
  },
  computed:{
    currentName(){
      var cur = this.menus.find(x=>x.path==this.$route.path);
      if(cur) return cur.name;
      if(this.$route.path=="/topic") return "帖子";
      return "";
    }
  },
  mounted(){
    this.$service
      .get("/public/topics/total")
      .then(res => {

        if(!res.success) return;
        Object.keys(res.data).forEach(key=>{
          var obj = this.menus.find(x=>x.path == "/" + key);
          if(obj) obj.cnt = res.data[key];
        })
      });
  },
};
</script>

<style lang='less' scoped>

.frame-menu{
    .primary-menu{
      margin: 4px 0;
      position: relative;
      height: 50px;
      .primary-wrap{
        margin: 0 auto;
        border-bottom: 1px solid #e5e9ef;
        display: flex;
        .primary-wrap-left{
          flex: 2;
          ul{
            display: flex;
            height: 50px;
            li{
              cursor: pointer;
              padding: 6px 0;
              margin-right: 30px;
              font-size: 12px;
              line-height: 20px;
              .update{
                margin: 2px 0;
                background-color: #ffafc9;
                color: #fff;
                border-radius: 3px;
                font-size: 12px;
                line-height: 18px;
                min-width: 30px;
              }
              div.current{
                color: #ffafc9;
              }
            }
          }
        }
        .primary-wrap-right{
          ul{
            display: flex;
            justify-content: flex-end;
            height: 50px;
            li{
              cursor: pointer;
              padding: 6px 0;
              font-size: 12px;
              line-height: 20px;
            }
          }
        }
      }
      .primary-wrap{
        width: 1160px;
      }
      @media screen and (max-width: 1400px){
        .primary-wrap{
          width: 980px;
        }
      }
    }
    .bread-card{
      margin: 0 auto;
      text-align: left;
      line-height: 40px;
      width: 1160px;
    }
    @media screen and (max-width: 1400px){
      .bread-card{
        width: 980px;
      }
    }
}
</style>
