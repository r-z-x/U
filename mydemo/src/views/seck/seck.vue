<template>
  <div>
    <!-- 面包屑 -->
    <el-bread></el-bread>
    <!-- 添加按钮 -->
    <el-button type="primary" @click="add">添加</el-button>
    <!-- 列表渲染 -->
    <v-table @edit="edit"></v-table>
    <!-- 弹框 -->
    <v-dialog ref="dialog" @cancel="cancel" :addInfo="addInfo"></v-dialog>
  </div>
</template>

<script>
import elBread from "../../components/el-bread";
import vTable from "./list";
import vDialog from "./add";
export default {
  data() {
    return {
      addInfo: {
        isShow: false, //弹框打开关闭
        isAdd: true //添加还是编辑
      }
    };
  },
  components: {
    elBread,
    vTable,
    vDialog
  },
  methods: {
    add() {
      this.addInfo.isShow = true;
      this.addInfo.isAdd = true;
    },
    cancel() {
      this.addInfo.isShow = false;
    },
    edit(e) {
      this.addInfo.isShow = true;
      this.addInfo.isAdd = false;
      this.$refs.dialog.look(e);
    }
  }
};
</script>

<style lang="stylus" scoped>
.el-button
  margin-bottom 20px
</style>
