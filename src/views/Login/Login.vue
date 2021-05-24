<template>
  <el-form ref="ruleForm" :rules="rules" :model="form" status-icon>
    <el-form-item prop="username">
      <el-input
        placeholder="请输入名称"
        prefix-icon="el-icon-s-custom"
        v-model="form.username"
      ></el-input>
    </el-form-item>
    <el-form-item prop="password">
      <el-input
        placeholder="请输入密码"
        prefix-icon="el-icon-lock"
        v-model="form.password"
        show-password
      ></el-input>
    </el-form-item>
    <!-- <div class="form__check">
      <el-checkbox v-model="form.remember">记住3天</el-checkbox>
    </div> -->
    <el-row>
      <el-col :span="16">
        <el-form-item>
          <el-input placeholder="验证码" v-model="form.code"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <img
          :src="captcha"
          @click="onCaptchaClick"
          alt="验证码"
          class="captcha-img"
        />
      </el-col>
    </el-row>
    <el-form-item>
      <el-button size="medium" class="form__submit" type="primary" @click="submitForm"
        >登录</el-button
      >
    </el-form-item>
  </el-form>
</template>

<script>
import { reactive, ref } from "vue";
export default {
  name: "VLogin",
  setup() {
    const form = reactive({
      username: "",
      password: "",
      //   remember: false,
      code: "",
    });
    const captcha = ref("/api/getCaptcha");
    const rules = {
      username: [{ required: true, message: "请输入名称" }],
      password: [{ required: true, message: "请输入密码" }],
    };
    const onCaptchaClick = () => {
      captcha.value = `/api/getCaptcha?t=${Date.now()}`;
    };
    return {
      form,
      rules,
      captcha,
      onCaptchaClick,
    };
  },
  methods: {
    submitForm() {
      this.$refs.ruleForm.validate(async (valid) => {
        if (valid) {
          await this.$store.dispatch("login", this.form);
          this.$router.push("/");
        }
      });
    },
    resetForm() {
      this.$refs.ruleForm.resetFields();
    },
  },
};
</script>

<style scoped lang="scss">
.form {
  &__check {
    margin-bottom: 8px;
  }

  &__submit {
    width: 100%;
  }
}
.captcha-img {
  width: 100%;
  height: 40px;
  cursor: pointer;
}
</style>
