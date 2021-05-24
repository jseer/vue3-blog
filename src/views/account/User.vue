<template>
  <el-table :data="list" style="width: 100%;">
    <el-table-column prop="avator" label="头像">
      <template #default="{row}">
        <img :src="row.avator" alt="头像" class="avator" />
      </template>
    </el-table-column>
    <el-table-column prop="username" label="用户名"> </el-table-column>
    <el-table-column
      prop="email"
      label="邮箱"
      :formatter="(x, y, v) => v || '--'"
    >
    </el-table-column>
    <el-table-column
      prop="isAdmin"
      label="是否管理员"
      :formatter="(x, y, v) => (v ? '是' : '否')"
    >
    </el-table-column>
    <el-table-column label="操作">
      <template #default="{row}">
        <el-button type="primary" @click="onEditClick(row)"
          >编辑</el-button
        >
        <el-button type="danger" @click="onDeleteClick(row.id)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
  <div class="pagination">
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pageInfo.pageNum"
      :page-sizes="[5, 10, 20]"
      :page-size="pageInfo.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    >
    </el-pagination>
  </div>
  <VDialog
      :visible="visible"
      @ok="onDialogOk"
      @close="visible = false"
      :data="curData"
    />
</template>

<script>
import { reactive, watchEffect, ref, getCurrentInstance } from "vue";
import { useStore, createNamespacedHelpers } from "vuex";
import VDialog from "./components/VDialog.vue";
import { deleteUser } from '@/api';

const { mapState } = createNamespacedHelpers("account");
export default {
  name: "VUser",
  setup() {
    const store = useStore();
    const pageInfo = reactive({
      pageNum: 1,
      pageSize: 10,
    });
    function queryUser() {
      store.dispatch("account/queryUser", {
        pageSize: pageInfo.pageSize,
        pageNum: pageInfo.pageNum,
      });
    }
    watchEffect(() => {
      queryUser()
    });
    const handleSizeChange = (pageSize) => {
      pageInfo.pageSize = pageSize;
    };
    const handleCurrentChange = (pageNum) => {
      pageInfo.pageNum = pageNum;
    };
    const visible = ref(false);
    const curData = ref({});
    function onEditClick(row) {
      curData.value = row;
      visible.value = true;
    }
    async function onDialogOk(values) {
      await store.dispatch('account/updateUser', values);
      queryUser();
      visible.value = false;
    }
    const vm = getCurrentInstance();
    function onDeleteClick(id) {
      vm.proxy.$confirm('删除后不能恢复，确定删除吗？', {
        iconClass: 'el-icon-info',
        callback: async (action)=> {
          if(action === 'confirm') {
            await deleteUser({ids: [id]});
            queryUser();
          }
        }
      })
    }
    return {
      pageInfo,
      handleSizeChange,
      handleCurrentChange,
      visible,
      curData,
      onEditClick,
      onDialogOk,
      onDeleteClick,
    };
  },
  components: {
    VDialog,
  },
  computed: {
    ...mapState({ total: "userTotal", list: "userList" }),
  },
};
</script>

<style scoped>
.title {
  margin-bottom: 10px;
}
.avator {
  width: 35px;
  height: 35px;
  border-radius: 50%;
}
</style>
