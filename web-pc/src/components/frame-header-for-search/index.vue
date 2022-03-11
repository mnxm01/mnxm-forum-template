<template>
  <div>
    <div class="frame-header">
      <navMenu></navMenu> 
    </div>
    <frame-menu></frame-menu>
  </div>
</template>

<script>
import navMenu from "../frame-header/nav-menu"
import frameMenu from "../frame-menu";
export default {
  components: { navMenu, frameMenu },
  data() {
    return {};
  },
};
</script>

<style lang='less' scoped>
@import url("./index.less");
</style>
