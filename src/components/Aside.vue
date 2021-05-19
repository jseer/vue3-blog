<template>
  <el-menu
    router
    :collapse="isCollapse"
    class="el-menu-vertical-container"
    :default-active="active"
    :default-openeds="openeds"
  >
    <el-menu-item index="/">
      <template #title>
        <i class="el-icon-s-home"></i>
        <span>首页</span>
      </template>
    </el-menu-item>
    <el-submenu index="/account">
      <template #title>
        <i class="el-icon-user-solid"></i>
        <span>用户中心</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="/account/user">
          用户管理
        </el-menu-item>
      </el-menu-item-group>
    </el-submenu>
  </el-menu>
</template>

<script>
import { reactive, ref, watch, onMounted } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
export default {
  name: "VAside",
  setup() {
    const { state } = useStore();
    const active = ref("");
    const openeds = ref([]);
    // 生命周期
    onMounted(() => {
      const route = useRoute();
      const list = route.path.split("/").filter(Boolean);
      console.log(list, route)
      if (list.length) {
        let str = "";
        for (let i = 1; i < list.length - 1; i++) {
          str += `/${list[i]}`;
          openeds.value.push(str);
        }
      }
       active.value = route.path;
    });
    return {
      isCollapse: state.isCollapse,
      active,
      openeds,
    };
  },
};
</script>

<style>
.el-menu-vertical-container:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>
