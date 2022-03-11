<template>
  <div class="module">
    <div class="module-screen-title">
      <a @click="$router.push('/' + detail)" style="float: right;">
        更多
      </a>
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
  },
};
</script>

<style lang='less' scoped>
.module{
  margin-top: 0.5rem;
  font-size: 0.8rem;
  padding: 0 1rem;
  .module-screen-title{
    text-align: left;
  }
  .module-screen{
    min-height: 12rem;
    margin-top: 0.5rem;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    .item{
      width: 49%;
      img{
        width: 100%;
        height: 5rem;
        border-radius: 0.2rem;
        display: block;
        cursor: pointer;
      }
      .item-title{
        line-height: 1.6rem;
        padding: 10px;
        cursor: pointer;
      }
    }
  }
}
</style>
