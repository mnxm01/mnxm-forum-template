<template>
  <div>
    <div class="frame-head">
      <frame-header></frame-header>
      <frame-menu></frame-menu>
    </div>
    <div class="frame-content-wrap">
      <router-view/>
    </div>
  </div>
</template>

<script>
import frameHeader from "../components/frame-header";
import frameMenu from "../components/frame-menu"
import { getToken } from "@/libs/utils.js";
export default {
  components: { frameHeader, frameMenu },
  data() {
    return {};
  },
  mounted(){
    if(getToken()) this.$store.dispatch("account/init")
  }
};
</script>

<style lang='less' scoped>
  .frame-head{
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    background-color: #fff;
    z-index: 999;
  }
  .frame-content-wrap{
    margin-top: 5.5rem;
  }
</style>
