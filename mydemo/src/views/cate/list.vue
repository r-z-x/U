<template>
  <div>
    <el-table
      :data="cateList"
      border
      style="width: 100%"
      row-key="id"
      :tree-props="{ children: 'children' }">
      <el-table-column prop="id" label="分类编号" width="80"> </el-table-column>
      <el-table-column prop="catename" label="分类名称" width="140">
      </el-table-column>
      <el-table-column  label="图片" width="180">
        <template slot-scope="item">
          <div>
            <img class="imgsize" :src="$imgUrl+item.row.img" alt="">
          </div>
        </template>
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
            <el-button type="danger" size="mini" @click="del(item.row.id)">删除</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
//引入辅助性函数
import { mapGetters, mapActions } from "vuex";
import { getCateDelete } from "../../util/axios";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      cateList: "cate/getCateList"
    })
  },
  mounted() {
    this.getCateListAction();
  },
  methods: {
    ...mapActions({
      getCateListAction: "cate/getCateListAction"
    }),
    edit(id){
      this.$emit('edit',id)
    },
    del(id) {
      this.$confirm("您确定要删除这条数据吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          getCateDelete({ id }).then(res => {
            if (res.data.code == 200) {
              this.$message.success(res.data.msg);
              this.getCateListAction();
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    }
  }
};
</script>

<style lang="stylus" scoped>
.el-table {
  margin-top: 20px;
}
.imgsize
   width 150px
</style>