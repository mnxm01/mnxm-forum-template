<template>
  <div class="menu-category">
    <dl v-if="items.length > 0" class="content">
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
      <dd v-if="current * pageSize + skip < total" class="content-more">
        <a @click="loadMore">加载更多</a>
      </dd>
      <dd v-else class="content-more">
        <a>已全部加载完毕</a>
      </dd>
    </dl>
    <dl v-else class="content" style="line-height: 2rem; padding: 1rem;">
      未找到相关结果~~~~~~~
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
    customValue: {
      type: String,
      default: ""
    },
  },
  data() {
    return {
      items: [],
      total: 0,
      current: 1,
      skip: 0,
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
      this.query();
    },
    query(){
      this.$service
        .get("/public/topics/page", {
          module: this.moduleName,
          custom: this.customValue,
          skip: (this.current - 1) * this.pageSize,
          limit: this.pageSize
        })
        .then(res => {
          this.items = res.data.items;
          this.total = res.data.count;
          this.skip = 0;
        });
    },
    loadMore(){
      this.skip += this.pageSize;
      this.$service
        .get("/public/topics/page", {
          module: this.moduleName,
          custom: this.customValue,
          skip: (this.current - 1) * this.pageSize + this.skip,
          limit: this.pageSize
        })
        .then(res => {
          this.items = this.items.concat(res.data.items);
          this.total = res.data.count;
        });
    },
    onPageChanged(page){
      this.current = page;
      this.query();
    }
  },
};
</script>

<style lang='less' scoped>
.menu-category {
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
    .content-more{
      text-align: center;
      line-height: 2rem;
      padding-bottom: 0.5rem;
    }
  }
}
</style>
