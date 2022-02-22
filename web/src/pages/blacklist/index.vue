<template>
  <div class="menu-category">
    <table border="1">
      <thead>
        <tr>
          <th width="150">账户</th>
          <th width="150">操作行为</th>
          <th width="150">过期时间</th>
          <th width="150">操作时间</th>
          <th>操作理由</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in items">
          <td><a @click="$router.push('/account?target=' + item.account)">{{item.account}}</a></td>
          <td>{{item.action}}</td>
          <td>{{item.action_time_remain}}</td>
          <td>{{item.datetime | dateTimeFilter}}</td>
          <td>{{item.reason}}</td>
        </tr>
      </tbody>
    </table>
    <Button
      :disabled="current * size + skip >= total"
      @click="loadMore"
      size="large"
      style="width: 100%; outline: none;"
    >加载更多</Button>
  </div>
</template>

<script>
import "jodit/build/jodit.min.css";
import { JoditVue } from "jodit-vue";
import { dateTimeFilter } from "@/libs/config.js";

export default {
  components: { JoditVue },
  data() {
    return {
      items: [],
      total: 0,
      current: 1,
      size: 10,
      skip: 0
    };
  },
  filters: {
    dateTimeFilter
  },
  mounted() {
    this.$service
      .get("/public/account/darkhouse", {
        skip: (this.current - 1) * this.size,
        limit: this.size
      })
      .then(res => {
        this.items = res.data.items;
        this.total = res.data.count;
        this.skip = 0;
      });
  },
  methods: {
    loadMore() {
      this.skip += this.size;
      this.$service
        .get("/public/account/darkhouse", {
          skip: (this.current - 1) * this.size,
          limit: this.size
        })
        .then(res => {
          this.items = this.items.concat(res.data.items);
          this.total = res.data.count;
        });
    }
  }
};
</script>

<style lang='less' scoped>
.menu-category {
  text-align: left;
  table {
    border-spacing: 0;
    width: 100%;
    text-align: center;
    line-height: 40px;
    margin-bottom: 10px;
    td, th{
      // border-color: #dcdee2;
      border: 0;
      border-bottom: solid 1px #dcdee2;
      border-right: solid 1px #dcdee2;
    }
  }
}
</style>
