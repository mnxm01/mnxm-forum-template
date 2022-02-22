<template>
  <div>
    <modal name="recommend" :clickToClose="false" :width="500" :height="450">
      <form class="recommend-setting">
        <fieldset>
          <legend align="center">
            <h3>设置图片</h3>
          </legend>
          <legend align="center">
            <img
              v-if="imageDataUrl"
              ref="preview"
              :src="imageDataUrl"
              width="380"
              height="210"
              @click="$refs.select.click()"
            />
            <img v-else :src="imageSrc" width="380" height="210" @click="$refs.select.click()" />
            <Button v-else class="button" @click="$refs.select.click()">选择</Button>
            <input ref="select" type="file" @change="change" style="display: none;" />
          </legend>
          <legend v-if="imageDataUrl" align="center">
            <Button class="button" @click="submit()">确定</Button>
          </legend>
          <legend align="center">
            <Button class="button" @click="$modal.hide('recommend')">取消</Button>
          </legend>
          <br />
        </fieldset>
      </form>
    </modal>
  </div>
</template>

<script>
import config from "@/libs/config.js";

export default {
  data() {
    return {
      topic_id: "",
      imageDataUrl: "",
      imageSrc: ""
    };
  },
  methods: {
    change() {
      var reader = new FileReader();
      reader.readAsDataURL(this.$refs.select.files[0]);
      reader.onload = e => {
        this.imageDataUrl = reader.result;
      };
    },
    show(_id, imgSrc) {
      this.topic_id = _id;
      this.imageSrc =
        config.commonBaseUrl + "/public/images/fetch?name=" + imgSrc;
        this.imageDataUrl = "";
      this.$modal.show("recommend");
    },
    submit() {
      this.$service
        .sendFile("/auth/topics/recommend_img", {
          _id: this.topic_id,
          image: this.$refs.select.files[0]
        })
        .then(res => {
          this.$modal.hide("recommend");
        });
    }
  }
};
</script>

<style lang='less' scoped>
.recommend-setting {
  fieldset {
    border: 0;
    margin: 30px 60px;
    legend {
      width: 100%;
      line-height: 32px;
      margin-bottom: 20px;
      display: flex;
      .button {
        flex: 1;
      }
    }
  }
}
</style>
