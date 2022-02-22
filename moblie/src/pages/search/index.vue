<template>
  <div class="search">
    <div class="frame-search-header">
      <frameHeader></frameHeader>
    </div>
    <div class="frame-content-wrap">
      <topics-category ref="category" :page-size="20" module-name="title_like" :custom-value="val"></topics-category>
    </div>
  </div>
</template>

<script>
import frameHeader from "@/components/frame-header-for-search";
import topicsCategory from "@/components/topics-category";
import frameFooter from "@/components/frame-footer";
export default {
  components: { frameHeader, topicsCategory, frameFooter },
  data() {
    return {
      val: this.$route.query.val
    };
  },
  mounted(){
    this.$bus.$on("on-search", (val)=>{
      this.val = val;
      this.$nextTick(()=>{
        this.$refs.category.query();
      })
    })
  },
};
</script>

<style lang='less' scoped>
.search {
  .frame-search-header{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    box-shadow: 0 0.1rem 0.1rem #f0f0f0;
    z-index: 999;
    background-color: #fff;
  }
  .frame-content-wrap {
    margin-top: 3.2rem;
  }
}
</style>
