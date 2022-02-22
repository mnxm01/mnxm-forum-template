<template>
  <div class="module">
    <div class="module-screen-title">
      <Button @click="$router.push('/' + detail)" style="float: right;">
        更多
        <Icon type="ios-arrow-forward" />
      </Button>
      <h3>{{title}}</h3>
    </div>
    <div class="module-screen">
      <img ref="noImage" src="@/assets/no-img.jpg" style="display: none;">
      <div v-for="item in items" :key="item._id" class="item">
        <img v-if="item.img" @click="$router.push('/topic?id=' + item._id)" src="" :origin-src="baseUrl + '/public/images/fetch?name=' + item.img" alt="">
        <img v-else @click="$router.push('/topic?id=' + item._id)" src="" :origin-src="$refs.noImage.src" alt="">
        <div class="item-title" @click="$router.push('/topic?id=' + item._id)">{{item.topic_title}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import config from "@/libs/config.js";

export default {
  props: {
    title: {
      type: String,
      default: ""
    },
    detail: {
      type: String,
      default: ""
    },
  },
  data() {
    return {
      baseUrl: config.commonBaseUrl,
      items: []
    };
  },
  methods: {
    load(items){
      this.items = items;
    }
  }
};
</script>

<style lang='less' scoped>
.module{
  .module-screen-title{
    margin-top: 20px;
    text-align: left;
  }
  .module-screen{
    min-height: 300px;
    margin-top: 15px;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    .item{
      width: 19%;
      img{
        width: 100%;
        height: 120px;
        border-radius: 5px;
        display: block;
        cursor: pointer;
      }
      @media screen and (max-width: 1400px){
        img{
          height: 100px;
        }
      }
      .item-title{
        line-height: 25px;
        padding: 10px;
        cursor: pointer;
      }
    }
  }
}
</style>
