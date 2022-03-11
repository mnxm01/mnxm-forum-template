<template>
  <div class="menu-top">
    <dl class="content">
      <dd v-for="item in items" class="item-wrap">
        <div class="title">
          <a @click="$router.push('/topic?id=' + item._id)">{{item.title}}</a>
        </div>
        <div class="item-content">
          <div class="author">
            <a @click="$router.push('/account?target=' + item.author)">{{item.author}}</a>
          </div>
          <span class="datetime">{{item.datetime | dateTimeFilter}}</span>
        </div>
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
  font-size: 0.8rem;
  text-align: left;
  background-color: #f0f0f0;
  .content{
    padding-top: 1px;
    .item-wrap{
      padding: 0.5rem 1rem;
      margin: 0.5rem 0;
      background-color: #fff;
      .title{
        width: 100%;
        font-weight: bold;
        line-height: 1.5rem;
        color: #fb7299;
      }
      .item-content{
        border-top: solid 0.05rem #f0f0f0;
        display: flex;
        line-height: 1.4rem;
        .author{
          width: 50%;
          text-align: left;
          a{
            color: #666;
          }
        }
        .datetime{
          width: 50%;
          color: #666;
          text-align: right;
        }
      }
    }
  }
}
</style>
