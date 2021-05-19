<template>
  <div class="login-wrapper">
    <div class="login__form">
      <el-tabs v-model="activeName" stretch class="login__form__tab">
        <el-tab-pane name="login">
          <template #label>
            <div class="login__form__tab__title">登录</div>
          </template>
          <VLogin ref="loginForm"/>
        </el-tab-pane>
        <el-tab-pane name="register">
          <template #label>
            <div class="login__form__tab__title">注册</div>
          </template>
          <VRegister @handle-active="toLogin"/>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import VLogin from "./Login.vue";
import VRegister from "./Register.vue";
export default {
  setup() {
    const activeName = ref("login");
    return {
      activeName,
    };
  },
  components: {
    VLogin,
    VRegister,
  },
  methods: {
    toLogin(params){
      this.activeName = 'login';
      this.$refs.loginForm.form.username = params.username;
      this.$refs.loginForm.form.password = params.password;
    }
  }
};
</script>

<style scoped lang="scss">
.login-wrapper {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background: url("../../assets/images/login-bg.jpeg") no-repeat center center;
  background-size: 100% 100%;
}
.login__form {
  width: 350px;
  position: absolute;
  top: 50%;
  right: 100px;
  transform: translateY(-50%);
  background: #fff;
  padding: 20px;
  height: 302px;
  &__tab {
    &__title {
      font-size: 18px;
    }
  }
}
</style>
