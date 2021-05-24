<template>
  <VTitle title="编辑文章">
    <template #actions>
      <div class="tool-bar">
        <el-button type="primary" class="tool-bar__btn" @click="onSave"
          >保存</el-button
        >
        <el-button class="tool-bar__btn" @click="$router.back()"
          >返回</el-button
        >
      </div>
    </template>
  </VTitle>

  <el-form
    ref="ruleForm"
    :model="form"
    :rules="rules"
    label-position="top"
    status-icon
    size="mini"
    class="detail-form"
  >
    <el-form-item label="标题" prop="title">
      <el-input v-model="form.title" style="width:350px"></el-input>
    </el-form-item>
    <el-form-item label="描述" prop="description">
      <el-input
        type="textarea"
        v-model="form.description"
        :rows="6"
        style="width:800px"
      ></el-input>
    </el-form-item>
    <el-form-item label="内容">
      <div class="mark-down-wrapper">
        <!-- <vue-markdown>i am a ~~tast~~ **test**.</vue-markdown> -->
        <el-input type="textarea" v-model="form.content" :rows="15"></el-input>
      </div>
    </el-form-item>
  </el-form>
</template>

<script>
import { reactive, ref, computed, getCurrentInstance, onMounted, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";
import VTitle from "@/components/VTitle";

export default {
  name: "PostDetail",
  setup() {
    const route = useRoute();
    const store = useStore();
    const router = useRouter();
    const vm = getCurrentInstance();
    const form = reactive({
      title: "",
      description: "",
      content: "",
    });
    async function getPost() {
      const { id } = route.query;
      if (id) {
        const post = await store.dispatch('post/get', {id});
        form.title = post.title;
        form.description = post.description;
        form.content = post.content;
      }
    }
    onMounted(() => {
      getPost()
    });
    watch(
      ()=> route.query,
      ()=> {
        getPost();
      }
    )
    const title = computed(() => (route.query.id ? "编辑文章" : "新建文章"));
    const ruleForm = ref(null);
    const rules = {
      title: [
        { required: true, message: "请输入内容" },
        { min: 1, max: 20, message: "不超过20个字符" },
      ],
      description: [
        { required: true, message: "请输入内容" },
        { min: 20, max: 100, message: "请输入20到100个字符" },
      ],
    };

    function onSave() {
      ruleForm.value.validate(async (valid) => {
        if (valid) {
          let message = "";
          const id = route.query.id;
          if (id) {
            await store.dispatch("post/update", {id,...form});
            message = "修改成功";
          } else {
            await store.dispatch("post/create", form);
            message = "保存成功";
            setTimeout(()=> {
              router.push('/post/list');
            }, 300)
          }
          vm.proxy.$message({
            type: "success",
            message,
          });
        }
      });
    }

    return {
      form,
      ruleForm,
      rules,
      title,

      onSave,
    };
  },
  components: {
    VTitle,
  },
};
</script>

<style scoped lang="scss">
.detail-form.el-form--label-top >>> .el-form-item__label {
  padding-bottom: 0;
}
.tool-bar {
  &__btn {
    margin-left: 10px;
  }
}
</style>
