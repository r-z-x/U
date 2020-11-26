<template>
  <div>
    <el-table :data="goodsList" border style="width: 100%">
      <el-table-column prop="id" label="商品编号"> </el-table-column>
      <el-table-column prop="goodsname" label="商品名称"> </el-table-column>
      <el-table-column prop="price" label="商品价格"> </el-table-column>
      <el-table-column prop="market_price" label="市场价格"> </el-table-column>
      <el-table-column label="图片">
        <template slot-scope="item">
          <div>
            <img class="img" :src="$imgUrl+ item.row.img">
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="status" label="是否新品" width='70'>
        <template slot-scope="item">
          <div>
            <el-tag v-if="item.row.isnew == 1" type="success">是</el-tag>
            <el-tag v-else type="danger">否</el-tag>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="status" label="是否热卖"  width='70'>
        <template slot-scope="item">
          <div>
            <el-tag v-if="item.row.ishot == 1" type="success">是</el-tag>
            <el-tag v-else type="danger">否</el-tag>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="status" label="状态"  width='70'>
        <template slot-scope="item">
          <div>
            <el-tag v-if="item.row.status == 1" type="success">启用</el-tag>
            <el-tag v-else type="danger">禁用</el-tag>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="操作" width='200'>
        <template slot-scope="item">
          <div>
            <el-button type="primary"  @click="edit(item.row.id)"
              >编辑</el-button>
            <el-button @click="del(item.row.id)" type="danger"
              >删除</el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      :page-size="goodsSize"
      background
      layout="prev, pager, next"
      :total="goodsCount"
      @current-change="currentChange"
    >
    </el-pagination>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { getGoodsDelete } from "../../util/axios";
export default {
  data() {
    return {};
  },
  mounted() {
    this.getGoodsAction();

    this.getGoodsCount();
  },
  methods: {
    ...mapActions({
      // getNewGoodsAction
      getGoodsAction: "goods/getGoodsAction",
    
      getGoodsCount: "goods/getCountAction",
      changePage: "goods/changePageAction"
    }),
    //封装一个删除事件
    del(id) {
      this.$confirm("确定要删除这一条商品信息吗？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          getGoodsDelete({ id }).then(res => {
            if (res.data.code == 200) {
              this.$message.success(res.data.msg);
              //重新调取列表
              this.getGoodsAction();
              this.getGoodsCount();
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    edit(id) {
      this.$emit("edit", id);
    },
    currentChange(e) {
      this.changePage(e);
    }
  },
   computed: {
    ...mapGetters({
      goodsList: "goods/getGoodsList",
      goodsCount: "goods/getGoodsCount",
      goodsSize: "goods/getGoodsSize"
    })
  },
};
</script>

<style lang="" scoped>
.el-pagination {
  float: right;
  margin: 20px 20px 0 0;
}
.img{
  width: 100px;
}
</style>
