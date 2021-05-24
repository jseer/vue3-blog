<template>
  <el-menu
    router
    :collapse="$store.state.isCollapse"
    class="el-menu-vertical-container"
    :default-active="active"
    :default-openeds="openeds"
    background-color="#192a56"
    text-color="#fff"
  >
    <el-menu-item index="/">
      <i class="el-icon-s-home"></i>
      <span>首页</span>
    </el-menu-item>
    <el-submenu index="post">
      <template #title>
        <i class="el-icon-user-solid"></i>
        <span>文章管理</span>
      </template>
      <el-menu-item index="/post/list">
        文章管理
      </el-menu-item>
      <el-menu-item index="/post/analysis">
        数据分析
      </el-menu-item>
    </el-submenu>
    <el-submenu index="account" v-if="userInfo.isAdmin">
      <template #title>
        <i class="el-icon-user-solid"></i>
        <span>用户中心</span>
      </template>
      <el-menu-item index="/account/user">
        用户管理
      </el-menu-item>
    </el-submenu>
  </el-menu>
</template>

<script>
import { ref, onMounted } from "vue";
import { useStore, mapState } from "vuex";
import { useRoute } from "vue-router";
export default {
  name: "VAside",
  setup() {
    const active = ref("");
    const openeds = ref([]);
    // 生命周期
    onMounted(() => {
      const route = useRoute();
      const list = route.path.split("/").filter(Boolean);
      if (list.length) {
        for (let i = 1; i < list.length - 1; i++) {
          openeds.value.push(list[i]);
        }
      }
      active.value = route.path;
    });
    return {
      active,
      openeds,
    };
  },
  computed: {
    ...mapState({ userInfo: (state) => state.userInfo || {} }),
  },
};
</script>

<style>
.el-menu-vertical-container:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
.el-menu-vertical-container {
  border: none;
}
</style>
