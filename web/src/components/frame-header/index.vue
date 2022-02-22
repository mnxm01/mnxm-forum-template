<template>
  <div>
    <div class="frame-header">
      <navMenu></navMenu>
      <div class="banner">
        <div class="banner-wrap">
          <Input
            v-model="search"
            search
             @on-search="$router.push('/search?val=' + search)"
            placeholder="最热游戏"
            style="width: 300px; position: absolute; bottom: 10px; right: 0;"
          >
            <Icon
              type="ios-search"
              slot="suffix"
              style="cursor: pointer;"
              @click="$router.push('/search?val=' + search)"
            />
          </Input>
        </div>
      </div>
    </div>
    <frame-menu></frame-menu>
  </div>
</template>

<script>
import navMenu from "./nav-menu";
import frameMenu from "../frame-menu";
export default {
  components: { navMenu, frameMenu },
  data() {
    return {
      search: ""
    };
  },
};
</script>

<style lang='less' scoped>
@import url("./index.less");
</style>
