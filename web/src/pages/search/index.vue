<template>
  <div class="search">
    <frameHeader></frameHeader>
    <div class="frame-content-wrap">
      <Row style="border-bottom: 1px solid #e5e9ef; margin-bottom: 10px;">
        <Col span="4">&nbsp;</Col>
        <Col span="16">
          <Input v-model="val" search @on-search="$refs.category.query()" placeholder style="margin: 0 0 30px 0;">
            <Button slot="append">搜索</Button>
          </Input>
        </Col>
        <Col span="4">&nbsp;</Col>
      </Row>
      <topics-category ref="category" :page-size="20" module-name="title_like" :custom-value="val"></topics-category>
    </div>
    <frame-footer></frame-footer>
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
  }
};
</script>

<style lang='less' scoped>
.search {
  .frame-content-wrap {
    width: 1160px;
    margin: 0 auto;
  }
  @media screen and (max-width: 1400px) {
    .frame-content-wrap {
      width: 980px;
    }
  }
}
</style>
