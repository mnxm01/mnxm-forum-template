<template>
  <div class="login-base">
    <form class="login">
      <fieldset>
        <legend align="center">
          <h3>用户登录</h3>
        </legend>
      </fieldset>
      <fieldset>
        <legend class="field" align="center">
          <input class="input" v-model="formData.account" placeholder="请输入账户"></input>
        </legend>
        <legend class="field" align="center">
          <input class="input" type="password" v-model="formData.password" placeholder="请输入密码"></input>
        </legend>
        <br>
        <div class="button-login" @click="submit()">
          登录
        </div>
        <div class="button-cancel" @click="$router.go(-1)">
          取消
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
        password: ""
      },
    };
  },
  methods: {
    submit() {
      if(!this.formData.account){
        this.$toast.top('请输入账户');
        return;
      }
      if(!this.formData.password){
        this.$toast.top('请输入密码');
        return;
      }
      this.$store.dispatch("account/login", this.formData).then(res => {
        if (res.success) {
          this.$router.go(-1);
        }
      });
    }
  }
};
</script>

<style lang='less' scoped>
.login-base{
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #fff;
  .login {
    position: absolute;
    top: 50%;
    left: 0;
    right: 0;
    transform: translate(0, -70%);
    font-size: 0.8rem;
    fieldset {
      border: 0;
      legend.field {
        width: 100%;
        line-height: 1rem;
        display: flex;
        justify-content: space-between;
        border: solid 0.05rem #fb7299;
        border-radius: 0.2rem;
        overflow: hidden;
        input{
          width: 100%;
          font-size: 0.8rem;
          padding: 0.5rem 0.3rem;
          outline: none;
          border: none;
          text-align: center;
        }
      }
      .input {
        width: 60%;
      }
      .button-login {
        border-radius: 0.3rem;
        margin-top: 0.5rem;
        padding: 0.5rem 0;
        background-color: #fb7299;
        color: #fff;
        cursor: pointer;
      }
      .button-cancel {
        border-radius: 0.3rem;
        margin-top: 0.5rem;
        padding: 0.5rem 0;
        color: #fb7299;
        border: solid 0.05rem #fb7299;
        cursor: pointer;
      }
    }
  }
}
</style>
