<template>
  <div>
    <form class="login">
      <fieldset style="margin: 30px 0;">
        <legend align="center">
          <h3>用户登录</h3>
        </legend>
      </fieldset>
      <fieldset style="margin: 0 60px;">
        <legend class="field" align="center">
          <label>账户：</label>
          <Input class="input" v-model="formData.account" placeholder="请输入"></Input>
        </legend>
        <legend class="field" align="center" style="margin-bottom: 30px;">
          <label>密码：</label>
          <Input class="input" type="password" v-model="formData.password" placeholder="请输入"></Input>
        </legend>
        <legend class="field" align="center">
          <Button class="button" @click="submit()">登录</Button>
          <Button class="button" @click="$modal.hide('login')">取消</Button>
        </legend>
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
    show() {
      this.$modal.show("login");
    },
    submit() {
      if(!this.formData.account){
        this.$toast.top("请输入账户");
        return;
      }
      if(!this.formData.password){
        this.$toast.top("请输入密码");
        return;
      }
      this.$store.dispatch("account/login", this.formData).then(res => {
        if (res.success) {
          this.$store.dispatch("account/init").then(res => {
            this.$modal.hide("login");
            this.$bus.$emit("update-token");
          });
        }
      });
    }
  }
};
</script>

<style lang='less' scoped>
.login {
  fieldset {
    border: 0;
    legend.field {
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
</style>
