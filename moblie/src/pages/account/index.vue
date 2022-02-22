<template>
  <div class="account">
    <div>
      <h3 class="title">账户信息</h3>
      <!-- <span slot="extra">
        <a v-if="canOperateDenied" @click="operate('denied')"><Icon type="ios-loop-strong"></Icon>拉黑</a>
        <a v-if="canOperateOrdinary" @click="operate('ordinary')"><Icon type="ios-loop-strong"></Icon>解除</a>
      </span> -->
      <div class="row">
        <div span="24">账户：{{account}}</div>
      </div>
      <div class="row">
        <div span="24">类型：{{accountType}}</div>
      </div>
      <div class="row">
        <div span="24">邮箱：{{email}}</div>
      </div>
    </div>
    <div>
      <h3 class="title">活跃概况</h3>
      <div class="row">
        <div span="24">最后访问：{{login_date | dateTimeFilter}}</div>
      </div>
      <div class="row">
        <div span="24">注册时间：{{regDateTime | dateTimeFilter}}</div>
      </div>
    </div>
    <div v-if="$store.getters['account/get'] && !$route.query.target" class="logout" @click="logout">
      <span>退出</span>
    </div>
  </div>
</template>

<script>
import { accountTypeDic, dateTimeFilter } from "@/libs/config.js";

export default {
  data() {
    return {
      accountData: null,
    };
  },
  computed: {
    target(){
      return this.accountData || this.$store.getters['account/get'];
    },
    canOperateDenied(){
      return this.$store.getters['account/get'] && this.accountData 
        && this.accountData.type != "denied" 
        && this.$store.getters['account/get'].type == "admin"
        && this.accountData.type != "admin";
    },
    canOperateOrdinary(){
      return this.$store.getters['account/get'] && this.accountData 
        && this.accountData.type != "ordinary" 
        && this.$store.getters['account/get'].type == "admin"
        && this.accountData.type != "admin";
    },
    account(){
      return this.target ? this.target.account : "";
    },
    email(){
      return this.target ? this.target.email : "";
    },
    accountType(){
      return this.target ? accountTypeDic[this.target.type] : "";
    },
    regDateTime(){
      return this.target ? this.target.reg_date : "";
    },
    login_date(){
      return this.target ? this.target.login_date : "";
    }
  },
  filters: {
    dateTimeFilter
  },
  mounted(){
    if(this.$route.query.target){
      this.init();
    }
  },
  methods:{
    init(){
      
      this.$service.get("/public/account/target",{
        target: this.$route.query.target
      })
      .then(res => {
        if (!res.success) {
          this.$toast.top(res.msg);
          return;
        }
        this.accountData = res.data;
      })
      .catch(err => {
        this.$toast.top(err.msg);
      });
    },
    operate(type){
      this.$service.post("/auth/account/operate",{
        body: {
          account: this.$route.query.target,
          account_type: type,
          action: "禁止发言",
          action_time_remain: "一小时",
          reason: "回复太频繁"
        }
      })
      .then(res => {
        if (!res.success) {
          this.$toast.top(res.msg);
          return;
        }
        this.$toast.top("操作成功");
        this.init();
      })
      .catch(err => {
        this.$toast.top(err.msg);
      });
    },
    logout(){
      this.$store.dispatch("account/logout").then(res => {
        this.$router.replace("/home");
      });
    },
  }
};
</script>

<style lang='less' scoped>
.account {
  border-top: solid 0.05rem #f0f0f0;
  text-align: left;
  font-size: 0.8rem;
  padding: 0 1rem 1rem 1rem;
  background-color: #fff;
  .title{
    padding: 0.5rem 0;
  }
  .row{
    padding: 0.2rem 0;
  }
  .logout{
    margin-top: 1rem;
    padding: 0.5rem 0;
    text-align: center;
    color: #fb7299;
    border: solid 1px #fb7299;
    border-radius: 0.3rem;
    cursor: pointer;
  }
}
</style>
