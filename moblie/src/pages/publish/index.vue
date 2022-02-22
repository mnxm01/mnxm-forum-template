<template>
  <div class="my-pub">
    <div class="title">
      <h3>我的发布</h3>
    </div>
    <div class="pub-content">
      <topics-category v-if="author" ref="category" :page-size="10" module-name="author" :custom-value="author"></topics-category>
    </div>
  </div>
</template>

<script>
import topicsCategory from "@/components/topics-category";
export default {
  components: { topicsCategory },
  data() {
    return {};
  },
  computed: {
    author(){
      var obj = this.$store.getters['account/get'];
      return obj ? obj.account : "";
    },
  }
};
</script>

<style lang='less' scoped>
.my-pub{
  border-top: solid 0.05rem #f0f0f0;
  text-align: left;
  font-size: 0.8rem;
  line-height: 1rem;
  .title{
    position: fixed;
    top: 3.2rem;
    left: 0;
    right: 0;
    padding: 1rem;
    box-shadow: 0 0.1rem 0.1rem #f0f0f0;
    z-index: 99;
    background-color: #fff;
  }
  .pub-content{
    margin-top: 3rem;
  }
}
</style>
