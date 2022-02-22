<template>
  <div class="publish">
    <Input v-model="title" size="large" placeholder="请输入标题" style="margin-bottom: 10px;" />
    <jodit-vue v-if="show_jodit" v-model="content" :config="config"></jodit-vue>
    <div style="line-height: 60px;">
      <Button @click="publish">发表新帖</Button>
    </div>
    <Spin v-if="!$store.getters['account/get']" fix>
      <div style="color: #666;">游客无法发言，请先<a @click="$bus.$emit('show-login')">登录</a></div>
    </Spin>
    <Spin v-else-if="$store.getters['account/get'].type=='denied'" fix>
      <div style="color: #666;">当前用户已被禁止发言</a></div>
    </Spin>
  </div>
</template>

<script>
import "jodit/build/jodit.min.css";
import { JoditVue } from "jodit-vue";
import config from "@/libs/config.js";
import { getToken } from "@/libs/utils.js";

export default {
  components: { JoditVue },
  props: {
    moduleName: {
      type: String,
      default: ""
    },
  },
  data() {
    return {
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
      title: "",
      content: "<p></p>"
    };
  },
  mounted(){
    this.$bus.$on("update-token", ()=>{
      this.config.uploader.headers.Authorization = getToken();
      //重绘
      this.show_jodit = false;
      this.$nextTick(()=>{
        this.show_jodit = true;
      })
    });
  },
  methods: {
    publish() {
      if(!this.$store.getters['account/get']){
        this.$toast.top("请先登录");
        return;
      }
      if(!this.title){
        this.$toast.top("请输入标题");
        return;
      }
      this.$service
        .post("/auth/topics/publish", {
          body: {
            title: this.title,
            author: this.$store.getters['account/get'].account,
            module: this.moduleName,
            detail: [
              {
                author: this.$store.getters['account/get'].account,
                author_type: this.$store.getters['account/get'].type,
                content: this.content,
              }
            ]
          }
        })
        .then(res => {
          this.title = "";
          this.content = "<p></p>";
          this.$toast.top("发表成功");
          this.$emit("publish-topics");
        });
    }
  }
};
</script>

<style lang='less' scoped>
.publish {
  text-align: left;
  position: relative;
}
</style>
