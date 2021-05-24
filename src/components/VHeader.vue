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
      <el-dropdown @command="logout">
        <img :src="avator" alt="头像" class="user-avator">
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapState, useStore } from 'vuex';
import { useRouter } from 'vue-router';

export default {
  name: "VHeader",
  setup() {
    const store = useStore();
    const router = useRouter();
    async function logout() {
      await store.dispatch('logout');
      router.push('/login');
    }
    return {
      logout,
    }
  },
  methods: {
      ...mapMutations(['onCollapse'])
  },
  computed: {
    ...mapState({isCollapse: 'isCollapse', avator: (state)=> state.userInfo.avator})
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
      width: 45px;
      height: 45px;
      border-radius: 50%;
      cursor: pointer;
    }
  }
}
</style>
