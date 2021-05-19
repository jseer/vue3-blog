<template>
  <el-container class="container">
    <el-header></el-header>
    <el-container>
      <el-aside width="auto">
        <VAside/>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import VAside from '@/components/Aside.vue';
export default {
  name: 'Home',
  components: {
    VAside,
  }
}
</script>

<style scoped>
.container {
  height: 100%;
}
</style>