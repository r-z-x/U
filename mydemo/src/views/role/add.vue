<template>
  <div>
    <el-dialog
      :title="addInfo.isAdd?'添加角色':'修改角色'"
      :visible.sync="addInfo.isShow"
      center
      :before-close="cancel"
    >
      <el-form :model="form" :rules="rules">
        <el-form-item
          prop="title"
          label="角色名称"
          :label-width="formLabelWidth"
        >
          <el-input v-model="form.rolename" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item
          prop="title"
          label="角色权限"
          :label-width="formLabelWidth">
          <el-tree
            :data="menuList"
            show-checkbox
            default-expand-all
            node-key="id"
            ref="tree"
            highlight-current
            :default-checked-keys ='[]'
            :props="{
              children: 'children',
              label: 'title',
            }"
          >
          </el-tree>
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
        <el-button type="primary" @click="add" v-if="addInfo.isAdd">添 加</el-button>
        <el-button type="primary" v-else @click="update">修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import {getRoleAdd,getRoleEdit,getRoleInfo} from "../../util/axios"
import listVue from '../menu/list.vue';
export default {
  data() {
    return {
      form: {
        rolename: "", //角色名称
        menus: "", //
        status: 1, //状态1正常2禁用
      },
      rules: {
        title: [
          { required: true, message: "请输入角色名称", trigger: "blur" },
          {
            min: 2,
            max: 20,
            message: "长度在 1 到 20 个字符",
            trigger: "blur",
          },
        ],
        pid: [{ required: true, message: "请选择上级菜单", trigger: "blur" }],
      },
      formLabelWidth: "120px",
    };
  },
  methods: {
    cancel() {
      this.$emit("cancel", false);
      this.reset()
    },
    ...mapActions({
      getMenuAction: "menu/getMenuListAction",
      getRoleList:"role/getRoleListAction"
    }),
    add(){
      this.form.menus = this.$refs.tree.getCheckedKeys().join(',');
      getRoleAdd(this.form).then(res=>{
        if(res.data.code==200){
          this.$message.success = (res.data.msg);
          this.getRoleList();
          this.cancel();
        }else{
          this.$message.error = (res.data.msg);
        }
      })
    },
    reset(){  
      this.form={
        rolename: "", //角色名称
        status: 1, //状态1正常2禁用
      };
      this.$refs.tree.setCheckedKeys([])
    },
    update(){
      this.form.menus = this.$refs.tree.getCheckedKeys().join(',');
      getRoleEdit(this.form).then(res=>{
        if(res.data.code==200){
          this.$message.success = (res.data.msg);
          this.getRoleList();
          this.cancel();
        }else{
          this.$message.error = (res.data.msg);
        }
      })
    },
    //查看一条数据的方法
    look(id){
      getRoleInfo({id}).then(res=>{
        console.log(res);
        if(res.data.code==200){
          this.form = res.data.list
          this.form.menus = this.$refs.tree.setCheckedKeys(
            this.form.menus.split(',')
          );
          this.form.id = id;
        }
      })
    }
  },
  computed: {
    ...mapGetters({
      menuList: "menu/getMenuList",
    }),
  },
  mounted() {
    if (this.menuList.length == 0) {
      this.getMenuAction();
    }
  },
  props: ["addInfo"],
};
</script>

<style lang="stylus" scoped></style>