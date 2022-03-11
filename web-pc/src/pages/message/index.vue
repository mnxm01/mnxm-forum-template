<template>
  <div class="message">
    <Tabs type="card">
      <TabPane label="未读">
        <div v-for="item in $store.getters['message/unread']" :key="item._id" class="item">
          <a @click="detail(item)" style="float: right;">查看</a>
          <h4>{{item.from_account}} 在 {{item.title}} 中回复了你。</h4>
          <div v-html="item.content"></div>
        </div>
        <Button v-if="$store.getters['message/unread'].length>0" :disabled="!$store.getters['message/unreadCanLoadMore']" size="large" @click="$store.dispatch('message/nextUnread')" style="width: 100%; outline: none;">加载更多</Button>
      </TabPane>
      <TabPane label="已读">
        <div v-for="item in $store.getters['message/read']" :key="item._id" class="item">
          <a @click="detail(item)" style="float: right;">查看</a>
          <h4>{{item.from_account}} 在 {{item.title}} 中回复了你。</h4>
          <div v-html="item.content"></div>
        </div>
        <Button v-if="$store.getters['message/read'].length>0" :disabled="!$store.getters['message/readCanLoadMore']" size="large" @click="$store.dispatch('message/nextRead')" style="width: 100%; outline: none;">加载更多</Button>
      </TabPane>
    </Tabs>
  </div>
</template>

<script>
export default {
  data() {
    return {};
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
  text-align: left;
  .item {
    margin-bottom: 5px;
    border: solid 1px #dcdee2;
    border-radius: 5px;
    padding: 15px;
    div{
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }
  }
}
</style>
