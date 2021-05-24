<template>
  <el-dialog title="修改用户信息" :model-value="visible" width="600px" @close="$emit('close')">
    <el-form ref="ruleForm" :model="form" label-width="120px">
      <el-form-item label="重置密码">
        <el-input v-model.trim="form.password"></el-input>
      </el-form-item>
      <el-form-item label="是否管理员">
        <el-select v-model="form.isAdmin">
          <el-option label="是" :value="true"></el-option>
          <el-option label="否" :value="false"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="$emit('close')">取 消</el-button>
        <el-button type="primary" @click="onOk">确 定</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script>
import { ref, reactive, watch } from 'vue';
export default {
  name: "VDialog",
  props: {
    visible: {
      type: Boolean,
      required: true,
    },
    data: {
      type: Object,
      required: true,
    },
  },
  emits: ['ok', 'close'],
  setup(props, { emit }) {
    const ruleForm = ref(null);
    const form = reactive({
        isAdmin: false,
        password: '',
    });

    watch(()=>props.data, (data)=> {
        form.isAdmin = data.isAdmin;
    })

    const rules = {
      password: [
        { min: 6, max: 20, message: "请输入6到20个字符" },
      ],
      isAdmin: {
        required: true,
        message: "请选择",
      },
    };
    function onOk() {
      ruleForm.value.validate((valid, values) => {
        if (valid) {
            emit('ok', {id: props.data.id, ...form});
        }
      });
    }
    return {
      ruleForm,
      rules,
      onOk,
      form,
    };
  },
};
</script>

<style></style>
