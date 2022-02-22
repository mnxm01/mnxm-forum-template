<template>
  <div>
    <topics-top module-name="novel"></topics-top>
    <topics-category ref="category" module-name="novel"></topics-category>
    <br>
    <publish @publish-topics="onPublishTopics" module-name="novel"></publish>
  </div>
</template>

<script>
import topicsTop from "@/components/topics-top";
import topicsCategory from "@/components/topics-category";
import publish from "@/components/publish";
export default {
  components: { topicsTop, topicsCategory, publish },
  data() {
    return {};
  },
  methods: {
    onPublishTopics(){
      this.$refs.category.reload();
    },
  },
};
</script>

<style lang='less' scoped>
</style>
