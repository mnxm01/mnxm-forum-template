<template>
  <div class="menu-top">
    <dl class="content">
      <dd v-for="item in items" class="item-wrap">
        <i class="mark">
          <img src="@/assets/fire.svg" alt="" width="20" height="20" style="position: relative; top: 4px;">
        </i>
        <div class="title">
          <a @click="$router.push('/topic?id=' + item._id)">{{item.title}}</a>
        </div>
        <div class="reply">
          <label for="">共{{item.reply_cnt ? item.reply_cnt : 0}}条回复</label>
        </div>
        <div class="author">
          <a @click="$router.push('/account?target=' + item.author)">{{item.author}}</a>
        </div>
        <span class="datetime">{{item.datetime | dateTimeFilter}}</span>
      </dd>
    </dl>
  </div>
</template>

<script>
import { dateTimeFilter } from "@/libs/config.js";
export default {
  props: {
    pageSize: {
      type: Number,
      default: 10
    },
    moduleName: {
      type: String,
      default: ""
    },
  },
  data() {
    return {
      items: [],
    };
  },
  filters: {
    dateTimeFilter
  },
  mounted(){
    this.query();
  },
  methods: {
    reload(){
      console.log("reload")
    },
    query(){
      this.$service
        .get("/public/topics/top", {
          module: this.moduleName,
          skip: 0,
          limit: this.pageSize
        })
        .then(res => {
          this.items = res.data.items;
        });
    }
  },
};
</script>

<style lang='less' scoped>
.menu-top {
  text-align: left;
  .content{
    .item-wrap{
      display: flex;
      line-height: 40px;
      .mark{
        text-align: left;
        line-height: 40px;
        width: 30px;
      }
      .title{
        width: 60%;
        a{
          color: #d81e06;
        }
      }
      .reply{
        flex: 1;
        text-align: center;
        font-size: 12px;
        line-height: 40px;
        color: #d81e06;
      }
      .author{
        flex: 1;
        text-align: center;
        a{
          color: #d81e06;
        }
      }
      .datetime{
        width: 15%;
        color: #d81e06;
        text-align: right;
      }
    }
  }
}
</style>
