<template>
  <div>
    <div class="first-screen">
      <div class="first-screen-left">
        <!-- <img src="@/assets/show01.jpg" /> -->
        <slider ref="slider" :options="options" style="border-radius: 5px;">
          <!-- slideritem wrapped package with the components you need -->
          <slideritem
            v-for="(item, index) in someList"
            :key="index"
          >
            <img v-if="item.img" @mousedown="onMouseDown(item, $event)" @mouseup="onMouseUp(item, $event)" :src="baseUrl + '/public/images/fetch?name=' + item.img" alt="">
            <img v-else @mousedown="onMouseDown(item, $event)" @mouseup="onMouseUp(item, $event)" src="@/assets/no-img.jpg" alt="">
          </slideritem>
          <!-- Customizable loading -->
          <div slot="loading">loading...</div>
        </slider>
      </div>
      <div class="first-screen-right">
        <div v-for="item in items" :key="item._id" class="item-wrap">
          <a
            class="type"
            @click="$router.push('/' + item.module)"
          >[{{ item.module | moduleNameFilter}}]</a>
          <a class="title" @click="$router.push('/topic?id=' + item._id)">{{item.topic_title}}</a>
          <span class="time">{{item.rec_date | dateTimeFilter}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { slider, slideritem } from "vue-concise-slider";
import config from "@/libs/config";
import { dateTimeFilter } from "@/libs/config.js";

export default {
  components: {
    slider,
    slideritem
  },
  data() {
    return {

      baseUrl: config.commonBaseUrl,

      items: [],
      
      //Slider configuration [obj]
      options: {
        pagination: true,
        autoplay: 5000,
        thresholdDistance: 100, // Sliding distance threshold
        thresholdTime: 300, // Sliding time threshold decision
        grabCursor: true, // Scratch style
        speed: 300, // Sliding speed
        // timingFunction: 'ease', // Sliding mode
        loop: true, // Infinite loop
        // autoplay: 0 // Auto play[ms]
      },

      mouseDownPoint: null
    };
  },
  computed: {
    someList(){
      return this.items.slice(0, 3);
    },
  },
  filters: {
    moduleNameFilter(val) {
      var dic = {
        game: "游戏",
        anim: "动漫",
        cartoon: "漫画",
        novel: "小说",
        other: "周边"
      };
      if (val) {
        return dic[val];
      }
      return "";
    },
    dateTimeFilter
  },
  methods: {
    load(items) {
      this.items = items;
    },
    onMouseDown(item, evt){
      this.mouseDownPoint = {
        x: evt.screenX,
        y: evt.screenY
      };
    },
    onMouseUp(item, evt){
      if(this.mouseDownPoint && evt.screenX == this.mouseDownPoint.x && evt.screenY == this.mouseDownPoint.y){
        this.$router.push('/topic?id=' + item._id);
      }
    },
  }
};
</script>

<style lang='less' scoped>
.first-screen {
  margin-top: 25px;
  display: flex;
  justify-content: space-between;
  .first-screen-left {
    width: 49%;
    overflow: hidden;
    img {
      width: 100%;
      height: 260px;
      border-radius: 5px;
      cursor: pointer;
    }
    @media screen and (max-width: 1400px) {
      img {
        height: 220px;
      }
    }
  }
  .first-screen-right {
    width: 49%;
    display: flex;
    flex-direction: column;
    .item-wrap {
      flex: 1;
      text-align: left;
      .type {
        color: #777;
      }
      .title {
        color: #333;
      }
      .time {
        color: #999;
        float: right;
      }
    }
  }
}
</style>
