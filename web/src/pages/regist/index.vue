<template>
  <div class="regist">
    <form class="form">
      <fieldset>
        <legend align="center" style="line-height: 48px; display: block; text-align: center;">
          <h2>用户注册</h2>
        </legend>
        <div class="field">
          <label>账户：</label>
          <Input class="input" v-model="formData.account" placeholder="请输入"></Input>
        </div>
        <div class="field">
          <label>密码：</label>
          <Input class="input" type="password" v-model="formData.password" placeholder="请输入"></Input>
        </div>
        <div class="field">
          <label>确认密码：</label>
          <Input class="input" type="password" v-model="formData.password_again" placeholder="请输入"></Input>
        </div>
        <div class="field" style="margin-bottom: 40px;">
          <label>邮箱：</label>
          <Input class="input" v-model="formData.email" placeholder="请输入"></Input>
        </div>
        <div class="field">
          <Button class="button" @click="submit()">注册</Button>
          <Button class="button" @click="$router.go(-1)">返回</Button>
        </div>
        <br />
      </fieldset>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formData: {
        account: "",
        password: "",
        password_again: "",
        email: ""
      }
    };
  },
  methods: {
    submit() {

      if(!this.formData.account){
        this.$Message.error("请输入账户");
        return;
      }
      if(!/^[A-Za-z][A-Za-z0-9]{5,19}$/.test(this.formData.account)){
        this.$Message.error("账户格式不正确");
        return;
      }

      if(!this.formData.password){
        this.$Message.error("请输入密码");
        return;
      }
      
      if(!this.formData.password_again){
        this.$Message.error("请输入确认密码");
        return;
      }

      if(this.formData.password != this.formData.password_again){
        this.$Message.error("密码不一致");
        return;
      }

      if(!this.formData.email){
        this.$Message.error("请输入邮箱");
        return;
      }
      
      var data = JSON.parse(JSON.stringify(this.formData));
      delete data.password_again;

      this.$service
        .post("/public/account/regist", {
          body: data
        })
        .then(res => {
          if (!res.success) {
            this.$Message.error(res.msg);
            return res;
          }
          this.$Message.info("注册成功");
          this.$router.replace("/home");
        });
    }
  }
};
</script>

<style lang='less' scoped>
.regist {
  .form {
    position: fixed;
    width: 80%;
    max-width: 400px;
    top: 40%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: left;
    fieldset {
      border: 0;
      .field {
        width: 100%;
        line-height: 32px;
        margin-bottom: 20px;
        display: flex;
        justify-content: space-between;
        label {
          flex: 1;
          padding: 3px 0;
          text-align: left;
        }
        .input {
          flex: 3;
          padding: 3px;
        }
        .button {
          width: 47%;
        }
      }
    }
  }
}
</style>
