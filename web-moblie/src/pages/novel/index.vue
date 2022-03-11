<template>
  <div class="novel">
    <topics-top module-name="novel"></topics-top>
    <topics-category ref="category" module-name="novel" style="margin-top: -0.5rem"></topics-category>
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
