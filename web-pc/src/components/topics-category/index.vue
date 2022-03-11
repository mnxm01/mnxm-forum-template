<template>
  <div class="menu-category">
    <dl v-if="items.length > 0" class="content">
      <dd v-for="item in items" class="item-wrap">
        <Icon class="mark" type="ios-document-outline" size="20" />
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
      <Button :disabled="current * pageSize + skip >= total" @click="loadMore" size="large" style="width: 100%; outline: none;">加载更多</Button>
      <div style="line-height: 60px; text-align: right;">
        <Page :total="total" :page-size="pageSize" :current="current" @on-change="onPageChanged"/>
      </div>
    </dl>
    <dl v-else class="content" style="line-height: 60px;">
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
  text-align: left;
  min-height: 400px;
  .content{
    .item-wrap{
      display: flex;
      line-height: 40px;
      vertical-align: top;
      .mark{
        text-align: left;
        line-height: 40px;
        width: 30px;
      }
      .title{
        width: 60%;
        a{
          color: #666;
        }
      }
      .reply{
        flex: 1;
        text-align: center;
        font-size: 12px;
        line-height: 40px;
      }
      .author{
        flex: 1;
        text-align: center;
        a{
          color: #666;
        }
      }
      .datetime{
        width: 15%;
        color: #666;
        text-align: right;
      }
    }
  }
}
</style>
