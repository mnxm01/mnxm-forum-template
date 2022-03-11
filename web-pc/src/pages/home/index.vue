<template>
  <div style="min-height: 800px;">
    <screen1st ref="latest"></screen1st>
    <screen2nd ref="game" title="游戏" detail="game"></screen2nd>
    <screen2nd ref="anim" title="动漫" detail="anim"></screen2nd>
    <screen2nd ref="cartoon" title="漫画" detail="cartoon"></screen2nd>
    <screen2nd ref="novel" title="小说" detail="novel"></screen2nd>
    <screen2nd ref="other" title="周边" detail="other"></screen2nd>
  </div>
</template>

<script>
import screen1st from "./components/1st-screen";
import screen2nd from "./components/2nd-screen";
export default {
  components: {
    screen1st,
    screen2nd
  },
  data() {
    return {
      data: null,
      timeout: 0
    };
  },
  mounted() {
    this.$service.get("/public/topics/recommend", {}).then(res => {
      this.data = res.data;
      Object.keys(this.data).forEach(key=>{
        if(this.$refs[key]) this.$refs[key].load(this.data[key])
      });
      window.onscroll();
    });
    window.onscroll = () => {
      if (this.timeout > 0) {
        clearTimeout(this.timeout);
      }
      this.timeout = setTimeout(() => {
        [...document.images].forEach(image=>{
          if(!image.getAttribute("src") && image.getAttribute("origin-src")){
            if(image.getBoundingClientRect().top <= window.innerHeight) image.src = image.getAttribute("origin-src");
          }
        })
      },50);
    };
  }
};
</script>

<style lang='less' scoped>
</style>
