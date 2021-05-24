<template>
  <div class="nav">
    <div class="nav-logo">
      <span>后台管理系统</span>
    </div>
    <div class="nav-content">
      <div class="nav-icon" @click="onCollapse">
        <i class="el-icon-s-fold" v-if="!$store.state.isCollapse"></i>
        <i class="el-icon-s-unfold" v-else></i>
      </div>
      <el-dropdown>
        <span class="el-dropdown-link user-avator">
          下拉菜单<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>黄金糕</el-dropdown-item>
            <el-dropdown-item>狮子头</el-dropdown-item>
            <el-dropdown-item>螺蛳粉</el-dropdown-item>
            <el-dropdown-item disabled>双皮奶</el-dropdown-item>
            <el-dropdown-item divided>蚵仔煎</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex';
export default {
  name: "VHeader",
  setup() {},
  methods: {
      ...mapMutations(['onCollapse'])
  },
  computed: {
    isCollapse() {
      return this.$store.state.isCollapse;
    }
  }
};
</script>

<style scoped lang="scss">
.nav {
  height: 60px;
  display: flex;
  .nav-logo {
    width: 180px;
    line-height: 60px;
    color: #fff;
    &.is-collapse {

    }
  }
  .nav-content {
    display: flex;
    flex: 1;
    align-items: center;
    justify-content: space-between;
    padding: 0 10px;
    .nav-icon {
      color: #fff;
      font-size: 26px;
      cursor: pointer;
      &:hover {
        color: #409eff;
      }
    }
    .user-avator {
      color: #fff;
    }
  }
}
</style>
