<template>
  <el-row>
    <el-button
      style="margin-right:10px;"
      type="primary"
      @click="$router.push('/post/list/detail')"
      >新建文章</el-button
    >
    <el-col :span="6">
      <el-input v-model="params.keyword" placeholder="请输入内容">
        <template #suffix>
          <i
            class="el-icon-search el-input__icon search__icon"
            @click="onSearch"
          ></i>
        </template>
      </el-input>
    </el-col>
  </el-row>
  <el-table :data="list" style="width: 100%">
    <el-table-column prop="title" label="标题"> </el-table-column>
    <el-table-column prop="author" label="作者"> </el-table-column>
    <el-table-column
      prop="status"
      label="状态"
      :formatter="(x, y, val) => STATUS[val]"
    >
    </el-table-column>
    <el-table-column prop="count" label="浏览数"> </el-table-column>
    <el-table-column label="操作">
      <template #default="{row}">
        <el-button
          type="text"
          @click="$router.push(`/post/list/detail?id=${row.id}`)"
          >编辑</el-button
        >
        <el-button
          v-if="row.status === 0"
          type="text"
          @click="onPublish(row.id)"
          >发布</el-button
        >
        <el-button type="text" @click="onDeleteClick(row.id)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
  <div class="pagination">
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="params.pageNum"
      :page-sizes="[5, 10, 20]"
      :page-size="params.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    >
    </el-pagination>
  </div>
</template>

<script>
import { createNamespacedHelpers, useStore } from "vuex";
import { reactive, watch, getCurrentInstance, onMounted } from "vue";

const { mapState } = createNamespacedHelpers("post");

export default {
  name: "PostList",
  setup() {
    const vm = getCurrentInstance();
    const store = useStore();
    const params = reactive({
      pageSize: 10,
      pageNum: 1,
      keyword: "",
    });

    function queryPost() {
      store.dispatch("post/query", params);
    }
    watch([() => params.pageSize, () => params.pageNum], () => {
      queryPost();
    });

    onMounted(() => {
      queryPost();
    });

    async function onPublish(id) {
      await store.dispatch("post/publish", {
        ids: [id],
      });
      queryPost();
      vm.proxy.$message({
        type: "success",
        message: "发布成功",
      });
    }
    async function onDeleteClick(id) {
      await store.dispatch("post/delete", {
        ids: [id],
      });
      queryPost();
      vm.proxy.$message({
        type: "success",
        message: "删除成功",
      });
    }
    function handleCurrentChange(pageNum) {
      params.pageNum = pageNum;
    }
    function handleSizeChange(pageSize) {
      params.pageSize = pageSize;
    }
    function onSearch() {
      queryPost();
    }
    const STATUS = ["编辑中", "已发布"];
    return {
      STATUS,
      params,
      onDeleteClick,
      onPublish,
      handleCurrentChange,
      handleSizeChange,
      onSearch,
    };
  },
  computed: {
    ...mapState({
      list: "postList",
      total: "postTotal",
    }),
  },
};
</script>

<style scoped>
.search__icon {
  cursor: pointer;
}
</style>
