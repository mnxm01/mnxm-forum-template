<template>
  <div class="message">
    <div class="title">
      <label :class="type=='unread'?'selected':''" @click="type='unread'">未读</label>
      <label :class="type=='read'?'selected':''" @click="type='read'">已读</label>
    </div>
    <div class="tab-panel" v-if="type=='unread'">
      <div v-for="item in $store.getters['message/unread']" :key="item._id" class="item">
        <a @click="detail(item)" style="float: right;">查看</a>
        <h4>{{item.from_account}} 在 {{item.title}} 中回复了你。</h4>
        <div v-html="item.content"></div>
      </div>
      <div v-if="$store.getters['message/unread'].length>0&&$store.getters['message/unreadCanLoadMore']" class="button">
        <span @click="$store.dispatch('message/nextUnread')">加载更多</span>
      </div>
      <div v-else class="button">
        <span>已全部加载完毕</span>
      </div>
    </div>
    <div class="tab-panel" v-if="type=='read'">
      <div v-for="item in $store.getters['message/read']" :key="item._id" class="item">
        <a @click="detail(item)" style="float: right;">查看</a>
        <h4>{{item.from_account}} 在 {{item.title}} 中回复了你。</h4>
        <div v-html="item.content"></div>
      </div>
      
      <div v-if="$store.getters['message/read'].length>0&&$store.getters['message/readCanLoadMore']" class="button">
        <span @click="$store.dispatch('message/nextRead')">加载更多</span>
      </div>
      <div v-else class="button">
        <span>已全部加载完毕</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      type: "unread", // unread or read
    };
  },
  methods: {
    detail(item){
      this.$store.dispatch("message/saveRead", item._id);
      this.$router.push('/topic?id=' + item._topic_id);
    }
  }
};
</script>

<style lang='less' scoped>
.message {
  font-size: 0.8rem;
  background-color: #fff;
  .title{
    position: fixed;
    left: 0;
    right: 0;
    top: 3.2rem;
    z-index: 99;
    display: flex;
    text-align: center;
    padding: 0 1rem;
    background-color: #fff;
    label{
      flex: 1;
      padding: 0.5rem 0;
      border-bottom: solid 0.05rem #fb7299;
    }
    label.selected{
      color: #fff;
      background-color: #fb7299;
    }
  }
  .tab-panel{
    margin-top: 5.3rem;
    padding: 0.3rem 1rem;
    .item {
      margin-bottom: 0.3rem;
      border: solid 0.05rem #dcdee2;
      border-radius: 0.3rem;
      padding: 1rem;
      text-align: left;
      div{
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
      }
    }
    .button{
      text-align: center;
      padding: 1rem;
    }
  }
}
</style>
