<template>
  <div>
    <el-bread></el-bread>
    <el-button type="primary" @click="isAdd">添加</el-button>
    <table-bar @edit='edit'></table-bar>
    <add-bar  ref='dialog' @cancel='cancel' :addInfo='addInfo'></add-bar>
  </div>
</template>

<script>
import elBread from "../../components/el-bread";
import tableBar from "./list";
import addBar from "./add";
export default {
  data() {
    return {
      addInfo: {
        isShow: false,
        isAdd: true
      }
    };
  },
  components: {
    elBread,
    tableBar,
    addBar
  },
  methods: {
    isAdd(){
      this.addInfo.isAdd =true 
      this.addInfo.isShow = true
    },
    cancel(e){
      this.addInfo.isShow = e
    },
    edit(e){
      this.addInfo.isAdd =false 
      this.addInfo.isShow = true
      this.$refs.dialog.look(e)
    }
  },
};
</script>

<style lang="" scoped>
.el-button{
  margin-bottom: 20px;
}
</style>
