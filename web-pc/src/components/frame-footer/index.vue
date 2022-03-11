<template>
  <div class="frame-footer">
    <div class="footer" v-once>
      <p>
        Powered by mnxm | QQ: 1143887428 | Email: 1143887428@qq.com
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
  margin: 40px 0 0 0;
  padding: 30px;
  .footer{
    width: 1160px;
    margin: 0 auto;
  }
  @media screen and (max-width: 1400px){
    .footer{
      width: 980px;
    }
  }
}
</style>
