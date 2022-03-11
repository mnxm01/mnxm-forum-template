<template>
  <div class="topic-detail">
    <div class="topic-title">
      <h3>{{ topic ? topic.title : "--" }}</h3>
      <!-- <a v-if="accountType=='admin' && topic && !topic.top" @click="topicsTop">置顶</a>
      <a v-if="accountType=='admin' && topic && !topic.recommend" @click="recommend">推荐</a>
      <a v-if="accountType=='admin' && topic && topic.recommend" @click="showRecommendSetting">设置</a> -->
      <a @click="$router.go(-1)">返回</a>
    </div>
    <dl class="topic-content">
      <dd v-for="(item, index) in replys" class="topic-item-wrap">
        <div class="wrap-title">
          <img src="@/assets/default-avatar.gif" alt />
          <a @click="$router.push('/account?target=' + item.author)">{{item.author}}</a>
        </div>
        <div class="wrap-content">
          <section class="topic-item-content" v-html="item.content"></section>
          <footer class="topic-item-footer">
            <span>{{item.datetime | dateTimeFilter}}</span>
            <span style="float: right;">#{{ size * (current - 1) + index + 1}}</span>
          </footer>
        </div>
      </dd>
      
      <dd v-if="current * size + skip < total" class="content-more">
        <a @click="loadMore">加载更多</a>
      </dd>
      <dd v-else class="content-more">
        <a>已全部加载完毕</a>
      </dd>
    </dl>
    <div class="topic-footer">
      <div @click="showReplyLayer" class="btn">
        <img src="@/assets/reply.svg" alt="">
        <div>回复</div>
      </div>
      <div v-if="showReply" class="reply-layer">
        <textarea v-model="content" cols="30" rows="4"></textarea>
        <div class="btn-group">
          <div class="btn" @click="reply">
            提交
          </div>
          <div class="btn" @click="showReply=false">
            取消
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { accountTypeDic } from "@/libs/config.js";
import { getToken } from "@/libs/utils.js";
import { dateTimeFilter } from "@/libs/config.js";

export default {
  data() {
    return {
      topic: null,
      replys: [],

      size: 10,
      total: 0,
      current: 1,
      skip: 0,

      showReply: false,
      content: ""
    };
  },
  filters: {
    userTypeFilter(val) {
      var dic = accountTypeDic;
      return dic[val];
    },
    dateTimeFilter
  },
  computed: {
    accountType(val) {
      var account = this.$store.getters["account/get"];
      return account ? account.type : "";
    }
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.$service
        .get("/public/topics/detail", { _id: this.$route.query.id })
        .then(res => {
          this.topic = res.data;
        });
      this.query();
    },
    onPageChanged(page) {
      this.current = page;
      this.query();
    },
    showReplyLayer(){
      if(!this.$store.getters['account/get']){
        this.$toast.top("请先登录");
        return;
      }
      this.showReply = true;
    },
    reply() {
      if (!this.$store.getters["account/get"]) {
        this.$toast.top("请先登录");
        return;
      }
      this.$service
        .post("/auth/topics/reply", {
          body: {
            _topic_id: this.$route.query.id,
            content: "<p>" + this.content + "</p>",
            author: this.$store.getters["account/get"].account,
            author_type: this.$store.getters["account/get"].type
          }
        })
        .then(res => {
          this.$toast.top("回复成功");
          this.$emit("reply-topics");
          this.content = "";
          this.showReply = false;
          this.query();
        });
    },
    topicsTop() {
      this.$service
        .post("/auth/topics/top", {
          body: {
            _topic_id: this.$route.query.id,
            module: this.topic.module
          }
        })
        .then(res => {
          this.$toast.top("置顶成功");
          this.init();
        });
    },
    recommend() {
      this.$service
        .post("/auth/topics/recommend", {
          body: {
            _id: this.$route.query.id,
            topic_title: this.topic.title,
            topic_author: this.topic.author,
            module: this.topic.module
          }
        })
        .then(res => {
          if (res.success) {
            this.$toast.top("推荐成功");
            this.init();
            return;
          }
          this.$toast.toping(res.msg);
        });
    },
    showRecommendSetting() {
      this.$refs.recommendSetting.show(this.topic._id, this.topic.img);
    },
    query() {
      this.$service
        .get("/public/topics/replys", {
          _topic_id: this.$route.query.id,
          skip: (this.current - 1) * this.size,
          limit: this.size
        })
        .then(res => {
          this.replys = res.data.items;
          this.total = res.data.count;
          this.skip = 0;
        });
    },
    loadMore() {
      this.skip += this.size;
      this.$service
        .get("/public/topics/replys", {
          _topic_id: this.$route.query.id,
          skip: (this.current - 1) * this.size + this.skip,
          limit: this.size
        })
        .then(res => {
          this.replys = this.replys.concat(res.data.items);
        });
    }
  }
};
</script>

<style lang='less' scoped>
.topic-detail {
  text-align: left;
  font-size: 0.8rem;
  .topic-title {
    position: fixed;
    top: 3.2rem;
    left: 0;
    right: 0;
    display: flex;
    line-height: 2rem;
    background-color: #fff;
    box-shadow: 0 0.1rem 0.1rem #f0f0f0;
    z-index: 99;
    h3 {
      flex: 1;
      overflow: hidden;
      white-space: nowrap;
      margin: 0 0 0 1rem;
    }
    a {
      text-align: center;
      margin: 0 1rem 0 0;
    }
  }
  .topic-content {
    background-color: #f0f0f0;
    margin-top: 5rem;
    margin-bottom: 2.5rem;
    overflow-x: hidden;
    .topic-item-wrap {
      margin-top: 0.5rem;
      background-color: #fff;
      .wrap-title {
        text-align: left;
        padding: 0.5rem 1rem;
        width: 100%;
        display: flex;
        img {
          width: 1rem;
          height: 1rem;
          border-radius: 0.5rem;
        }
        a{
          padding-left: 0.5rem;
        }
      }
      .wrap-content {
        flex: 1;
        text-align: left;
        padding: 0 1rem 0.5rem 1rem;
        .topic-item-content{
          padding: 1px 0;
          margin-bottom: 0.5rem;
          p{
            margin-block-start: 0!important;
            margin-block-end: 0;
          }
        }
        .topic-item-footer{
          font-size: 12px;
        }
        .topic-item-footer::after{
          clear: both;
          content: "";
        }
      }
    }
    .content-more{
      text-align: center;
      line-height: 2rem;
      padding-bottom: 0.5rem;
    }
  }
  .topic-footer{
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    line-height: 0;
    padding: 0.75rem;
    text-align: center;
    box-shadow: 0 -0.1rem 0.1rem #f0f0f0;
    text-align: center;
    background-color: #fff;
    .btn{
      display: flex;
      justify-content: center;
      img{
        position: relative;
        top: -0.1rem;
        height: 1rem;
        display: block;
      }
      div{
        display: block;
        line-height: 1rem;
      }
    }
    .reply-layer{
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      background-color: #f0f0f0;
      border-top: solid 0.05rem #dcdcde;
      padding: 1rem;
      display: flex;
      flex-direction: column;
      textarea{
        outline: none;
        border: none;
        display: block;
        font-size: 0.8rem;
        border: solid 0.05rem #dcdcde;
        border-radius: 0.3rem;
        padding: 0.5rem;
        color: #757575;
      }
      .btn-group{
        margin-top: 1rem;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        line-height: 0.8rem;
        .btn{
          padding: 0.5rem;
          border: solid 0.05rem #dcdcde;
          width: 40%;
          background-color: #fff;
          border-radius: 0.2rem;
        }
      }
    }
  }
}
</style>
