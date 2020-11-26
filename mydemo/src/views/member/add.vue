<template>
  <div>
    <el-dialog
      title="修改会员"
      :visible.sync="addInfo.isShow"
       center
      :before-close="cancel">
      <el-form :model="form" >
        <el-form-item
          label="手机号"
          :label-width="formLabelWidth">
          <el-input v-model="form.phone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item
          label="昵称"
          :label-width="formLabelWidth">
          <el-input v-model="form.nickname" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item
          label="密码"
          :label-width="formLabelWidth">
          <el-input v-model="form.password" autocomplete="off"></el-input>
        </el-form-item>
        
        <el-form-item label="状态" :label-width="formLabelWidth">
          <!-- 可以使用active-color属性与inactive-color属性来设置开关的背景色。 -->
          <el-switch
            v-model="form.status"
            active-color="#13ce66"
            inactive-color="#ff4949"
            :active-value="1"
            :inactive-value="2"
          >
          </el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary"  @click="update">修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import {getMemberEdit,getMemberInfo} from "../../util/axios"
import listVue from '../menu/list.vue';
export default {
  data() {
    return {
      form: {
        password: "", //会员密码
        nickname:'',//会员昵称
        phone:'',//会员手机号
        status: 1, //状态1正常2禁用
      },
      formLabelWidth: "120px",
    };
  },
  methods: {
    cancel() {
      this.$emit("cancel", false);
    },
    ...mapActions({
      getMemberList:"member/getMemberListAction"
    }),
    update(){
      getMemberEdit(this.form).then(res=>{
        if(res.data.code==200){
          this.$message.success = (res.data.msg);
          this.getMemberList();
          this.cancel();
        }else{
          this.$message.error = (res.data.msg);
        }
      })
    },
    //查看一条数据的方法
    look(uid){
      getMemberInfo({uid}).then(res=>{
        console.log(res);
        if(res.data.code==200){
          this.form = res.data.list
        }
      })
    }
  },
  props: ["addInfo"],
};
</script>

<style lang="stylus" scoped></style>