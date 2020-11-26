<template>
  <div>
    <el-table
      :data="menuList"
      border
      style="width: 100%"
      row-key="id"
      :tree-props="{ children: 'children' }"
    >
      <el-table-column prop="id" label="菜单编号" width="80"> </el-table-column>
      <el-table-column prop="title" label="菜单名称" width="140">
      </el-table-column>
      <el-table-column
        prop="pid"
        label="上级菜单"
        width="140"
      ></el-table-column>
      <el-table-column prop="icon" label="菜单图标" width="180">
      </el-table-column>
      <el-table-column prop="url" label="菜单地址" width="180">
      </el-table-column>
      <el-table-column prop="status" label="状态" width="180">
        <template slot-scope="item">
          <div>
            <el-tag type="success" v-if="item.row.status == 1">启用</el-tag>
            <el-tag type="danger" v-else>禁用</el-tag>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="item">
          <div>
            <el-button type="primary" size="mini" @click="edit(item.row.id)">编辑</el-button>
            <el-button type="danger" size="mini" @click="del(item.row.id)"
              >删除</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import {getMenuDelete} from '../../util/axios'
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {};
  },
  //组件一加载就触发调取列表
  mounted() {
    this.getMenuList();
  },
  computed: {
    ...mapGetters({
      menuList: "menu/getMenuList",
    }),
  },
  methods: {
    ...mapActions({
      getMenuList: "menu/getMenuListAction",
    }),
    del(id) {
      this.$confirm(" 确定要删除该菜单吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
          getMenuDelete({id}).then(res=>{
            if(res.data.code==200){
              this.$message.success(res.data.msg)
              //重新触发调取列表
              this.getMenuList()
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    edit(id){
      this.$emit('edit',id)
    }
  },
};
</script>

<style lang="stylus" >
.el-table {
  margin-top: 20px;
}
.el-table td, .el-table th.is-leaf,.el-table{
  border-color #663366 !important
  border-bottom-color #663366 !important 
}
.el-table--border::after, .el-table--group::after, .el-table::before{
  background-color #663366 !important 
}

</style>