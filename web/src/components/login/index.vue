<template>
  <div>
    <modal name="login" :clickToClose="false" :width="400" :height="285">
      <form class="login">
        <fieldset style="margin: 30px 0;">
          <legend align="center">
            <h3>用户登录</h3>
          </legend>
        </fieldset>
        <fieldset style="margin: 0 60px;">
          <div class="field" align="center">
            <label>账户：</label>
            <Input class="input" v-model="formData.account" placeholder="请输入"></Input>
          </div>
          <div class="field" align="center" style="margin-bottom: 30px;">
            <label>密码：</label>
            <Input class="input" type="password" v-model="formData.password" placeholder="请输入"></Input>
          </div>
          <div class="field" align="center">
            <Button class="button" @click="submit()">登录</Button>
            <Button class="button" @click="$modal.hide('login')">取消</Button>
          </div>
          <br />
        </fieldset>
      </form>
    </modal>
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
        this.$Message.error("请输入账户");
        return;
      }
      if(!this.formData.password){
        this.$Message.error("请输入密码");
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
    .field {
      width: 100%;
      line-height: 32px;
      margin-bottom: 20px;
      display: flex;
      justify-content: space-between;
      flex-wrap: nowrap;
      label {
        flex: 1;
        padding: 3px 0;
        text-align: left;
      }
      .input {
        flex: 3;
        padding: 3px 0;
      }
      .button {
        width: 47%;
      }
    }
  }
}
</style>
