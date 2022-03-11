<template>
  <div>
    <frame-header></frame-header>
    <div class="frame-content-wrap">
      <router-view/>
    </div>
    <frame-footer></frame-footer>
  </div>
</template>

<script>
import frameHeader from "../components/frame-header";
import frameFooter from "../components/frame-footer";
import { getToken } from "@/libs/utils.js";
export default {
  components: { frameHeader, frameFooter },
  data() {
    return {};
  },
  mounted(){
    if(getToken()) this.$store.dispatch("account/init")
  }
};
</script>

<style lang='less' scoped>

  .frame-content-wrap{
    width: 1160px;
    margin: 0 auto;
  }
  @media screen and (max-width: 1400px){
    .frame-content-wrap{
      width: 980px;
    }
  }
</style>
