<template>
  <el-form :ref="(r)=>ruleForm=r" :model="form" :rules="rules" status-icon>
    <el-form-item prop="username">
      <el-input
        v-model="form.username"
        placeholder="请输入名称"
        prefix-icon="el-icon-s-custom"
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
    <el-form-item prop="checkPassword">
      <el-input
        placeholder="请再次输入密码"
        prefix-icon="el-icon-lock"
        v-model="form.checkPassword"
        show-password
      ></el-input>
    </el-form-item>
    <el-form-item>
      <el-button size="medium" class="form__submit" type="primary" @click="submitForm"
        >注册</el-button
      >
    </el-form-item>
  </el-form>
</template>

<script>
import { reactive, ref } from "vue";
export default {
  name: "VRegister",
  emits: ["handle-active"],
  setup() {
    const form = reactive({
      username: "",
      password: "",
      checkPassword: "",
    });
    const ruleForm = ref(null);
    const validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (form.checkPassword) {
          ruleForm.value.validateField("checkPassword");
        }
        callback();
      }
    };
    const validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== form.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    const rules = {
      username: [
        { required: true, message: "请输入名称" },
        { min: 1, max: 20, message: "不超过20个字符" },
      ],
      password: [
        { min: 6, max: 20, message: "请输入6到20个字符" },
        { validator: validatePass, trigger: 'blur' },
      ],
      checkPassword: [{ validator: validatePass2, trigger: 'blur' }],
    };
    return {
      form,
      rules,
      ruleForm,
    };
  },
  methods: {
    submitForm() {
      this.ruleForm.validate(async (valid) => {
        if (valid) {
          const params = {
            username: this.form.username,
            password: this.form.password,
          };
          await this.$store.dispatch("register", params);
          this.$emit("handle-active", params);
        }
      });
    },
    resetForm() {
      this.ruleForm.resetFields();
    },
  },
};
</script>

<style scoped lang="scss">
.form {
  &__submit {
    width: 100%;
  }
}
</style>
