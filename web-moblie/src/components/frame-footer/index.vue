<template>
  <div class="frame-footer">
    <div class="footer" v-once>
      <p>
        Powered by mnxm | Email: 1143887428@qq.com
      </p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  }
};
</script>

<style lang='less' scoped>

.frame-footer{
  border-top: dashed 1px #eee;
  margin: 0.5rem 0 0 0;
  padding: 0.5rem;
  font-size: 0.6rem;
  .footer{
    width: 100%;
    margin: 0 auto;
  }
}
</style>
