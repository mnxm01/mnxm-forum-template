<template>
  <div class="account">
    <Card>
      <p slot="title">账户信息</p>
      <span slot="extra">
        <a v-if="canOperateDenied" @click="operate('denied')"><Icon type="ios-loop-strong"></Icon>拉黑</a>
        <a v-if="canOperateOrdinary" @click="operate('ordinary')"><Icon type="ios-loop-strong"></Icon>解除</a>
      </span>
      <Row>
        <Col span="24">账户：{{account}}</Col>
      </Row>
      <Row>
        <Col span="24">类型：{{accountType}}</Col>
      </Row>
      <Row>
        <Col span="24">邮箱：{{email}}</Col>
      </Row>
    </Card>
    <Card style="margin-top: 10px;">
      <p slot="title">活跃概况</p>
      <Row>
        <Col span="24">最后访问：{{login_date | dateTimeFilter}}</Col>
      </Row>
      <Row>
        <Col span="24">注册时间：{{regDateTime | dateTimeFilter}}</Col>
      </Row>
    </Card>
  </div>
</template>

<script>
import { accountTypeDic } from "@/libs/config.js";
import { dateTimeFilter } from "@/libs/config.js";

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
          this.$Message.error(res.msg);
          return;
        }
        this.accountData = res.data;
      })
      .catch(err => {
        this.$Message.error(err.msg);
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
          this.$Message.error(res.msg);
          return;
        }
        this.$Message.info("操作成功");
        this.init();
      })
      .catch(err => {
        this.$Message.error(err.msg);
      });
    }
  }
};
</script>

<style lang='less' scoped>
.account {
  text-align: left;
}
</style>
