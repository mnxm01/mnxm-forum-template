<template>
  <div class="topic-detail">
    <div class="topic-title">
      <h3>{{ topic ? topic.title : "--" }}</h3>
      <a v-if="accountType=='admin' && topic && !topic.top" @click="topicsTop">置顶</a>
      <a v-if="accountType=='admin' && topic && !topic.recommend" @click="recommend">推荐</a>
      <a v-if="accountType=='admin' && topic && topic.recommend" @click="showRecommendSetting">设置</a>
      <a @click="$router.go(-1)">返回</a>
    </div>
    <dl class="topic-content">
      <dd v-for="(item, index) in replys" class="topic-item-wrap">
        <div class="wrap-left">
          <img src="@/assets/default-avatar.gif" alt />
          <div>
            <a @click="$router.push('/account?target=' + item.author)">{{item.author}}</a>
          </div>
          <div>{{item.author_type | userTypeFilter}}</div>
        </div>
        <div class="wrap-right">
          <section class="topic-item-content" v-html="item.content"></section>
          <footer class="topic-item-footer">
            <span>{{item.datetime | dateTimeFilter}}</span>
            <span style="float: right;">#{{ size * (current - 1) + index + 1}}</span>
          </footer>
        </div>
      </dd>
      <Button
        :disabled="current * size + skip >= total"
        @click="loadMore"
        size="large"
        style="width: 100%; outline: none; margin-top: 10px;"
      >加载更多</Button>
      <div style="line-height: 60px; text-align: right;">
        <Page :total="total" :page-size="size" :current="current" @on-change="onPageChanged" />
      </div>
    </dl>
    <div style="position: relative;">
      <jodit-vue v-if="show_jodit" v-model="content" :config="config"></jodit-vue>
      <div style="line-height: 60px;">
        <Button @click="reply">提交回复</Button>
      </div>
      <Spin v-if="!$store.getters['account/get']" fix>
        <div style="color: #666;">
          游客无法发言，请先
          <a @click="$bus.$emit('show-login')">登录</a>
        </div>
      </Spin>
      <Spin v-else-if="$store.getters['account/get'].type=='denied'" fix>
        <div style="color: #666;">当前用户已被禁止发言</div>
      </Spin>
    </div>
    <recommend-setting ref="recommendSetting"></recommend-setting>
  </div>
</template>

<script>
import "jodit/build/jodit.min.css";
import { JoditVue } from "jodit-vue";
import { accountTypeDic } from "@/libs/config.js";
import recommendSetting from "./recommendSetting";
import config from "@/libs/config.js";
import { dateTimeFilter } from "@/libs/config.js";
import { getToken } from "@/libs/utils.js";

export default {
  components: { JoditVue, recommendSetting },
  data() {
    return {
      topic: null,
      replys: [],

      size: 10,
      total: 0,
      current: 1,
      skip: 0,

      show_jodit: true,
      config: {
        heigth: 300,
        minHeight: 300,
        placeholder: "",
        language: "zh_cn",
        buttons: [
          "undo",
          "redo",
          "|",
          "bold",
          "strikethrough",
          "underline",
          "italic",
          "|",
          "superscript",
          "subscript",
          "|",
          "ul",
          "ol",
          "|",
          "outdent",
          "indent",
          "|",
          "font",
          "fontsize",
          "brush",
          "paragraph",
          "|",
          "image",
          // "file",
          "video",
          "table",
          "link",
          "hr",
          "symbol",
          "|",
          "align",
          "eraser",
          "copyformat",
          "|",
          "cut",
          "selectall",
          "|",
          'fullsize',
          "source",
          //'print',
          // 'about',
        ],
        uploader: {
          url: config.commonBaseUrl + "/auth/topics/reply_img",
          headers: {
            Authorization: getToken()
          },
          imagesExtensions: ["jpg", "png", "jpeg", "gif"],
          prepareData(req) {
            var file0 = req.get("files[0]");
            req.delete("files[0]");
            req.append("file", file0, file0.name);
            return req;
          },
          isSuccess(res) {
            if (res.success)
              this.jodit.selection.insertImage(
                config.commonBaseUrl +
                  "/public/images/fetch?name=" +
                  res.data
              );
            return res.success;
          },
          error(e) {
            console.error(e.message);
            this.jodit.events.fire("errorMessage", [e.message, "error", 4000]);
          }
        }
      },
      content: "<p></p>"
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
    this.$bus.$on("update-token", ()=>{
      this.config.uploader.headers.Authorization = getToken();
      //重绘
      this.show_jodit = false;
      this.$nextTick(()=>{
        this.show_jodit = true;
      })
    });
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
    reply() {
      if (!this.$store.getters["account/get"]) {
        this.$Message.info("请先登录");
        return;
      }
      this.$service
        .post("/auth/topics/reply", {
          body: {
            _topic_id: this.$route.query.id,
            content: this.content,
            author: this.$store.getters["account/get"].account,
            author_type: this.$store.getters["account/get"].type
          }
        })
        .then(res => {
          this.$Message.info("回复成功");
          this.$emit("reply-topics");
          this.content = "<p></p>";
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
          this.$Message.info("置顶成功");
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
            this.$Message.info("推荐成功");
            this.init();
            return;
          }
          this.$Message.warning(res.msg);
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
  .topic-title {
    display: flex;
    line-height: 50px;
    box-shadow: 0px 0px 3px rgba(0, 0, 0, 0.06);
    h3 {
      flex: 1;
      overflow: hidden;
      white-space: nowrap;
      margin: 0 0 0 15px;
    }
    a {
      text-align: center;
      margin: 0 15px 0 0;
    }
  }
  .topic-content {
    min-height: 400px;
    margin-bottom: 10px;
    .topic-item-wrap {
      border-bottom: solid 1px rgba(0, 0, 0, 0.06);
      border-right: solid 1px rgba(0, 0, 0, 0.06);
      display: flex;
      .wrap-left {
        text-align: center;
        padding: 20px 0;
        width: 150px;
        background-color: #fafbfc;
        img {
          width: 60px;
          border-radius: 30px;
        }
      }
      .wrap-right {
        flex: 1;
        text-align: left;
        padding: 20px;
        .topic-item-content{
          min-height: 100px;
          overflow: hidden;
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
  }
}
</style>
