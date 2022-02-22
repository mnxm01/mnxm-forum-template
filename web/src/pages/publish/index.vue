<template>
  <div>
    <topics-category v-if="author" ref="category" :page-size="10" module-name="author" :custom-value="author"></topics-category>
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
</style>
