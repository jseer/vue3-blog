<template>
  <el-container class="container">
    <el-header class="header">
      <VHeader/>
    </el-header>
    <el-container>
      <el-aside width="auto" class="aside">
        <VAside/>
      </el-aside>
      <el-main>
        <VTitle v-if="routeTitle" :title="routeTitle"/>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import VAside from '@/components/VAside.vue';
import VHeader from '@/components/VHeader.vue';
import VTitle from '@/components/VTitle.vue';

export default {
  name: 'Home',
  components: {
    VAside,
    VHeader,
    VTitle,
  },
  computed: {
    routeTitle() {
      return this.$route.meta.title;
    }
  }
}
</script>

<style scoped lang="scss">
.container {
  height: 100%;
  .header, .aside  {
     background: #192a56;
  }
}
</style>