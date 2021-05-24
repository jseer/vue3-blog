<template>
  <router-view></router-view>
</template>

<script>
export default {
  name: "App",
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
}
#app {
  height: 100vh;
  color: #606266;
}
.pagination {
  margin-top: 15px;
  display: flex;
  justify-content: flex-end;
}
</style>
