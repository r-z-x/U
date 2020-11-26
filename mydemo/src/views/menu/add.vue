<template>
  <div>
    <!-- 
      对话框属性
      visible	是否显示 Dialog，支持 .sync 修饰符
      center	是否对头部和底部采用居中布局
      formLabelWidth label的宽度
     -->
    <el-dialog :title="addInfo.isAdd?'添加菜单':'编辑菜单'" :visible.sync="addInfo.isShow" center>
      <el-form :model="form" :rules="rules" ref="formDialog">
        <el-form-item
          prop="title"
          label="菜单名称"
          :label-width="formLabelWidth"
        >
          <el-input v-model="form.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item prop="pid" label="上级菜单" :label-width="formLabelWidth">
          <el-select
            v-model="form.pid"
            placeholder="请选择"
            @change="changeRadio"
          >
            <el-option label="顶级菜单" :value="0"></el-option>
            <el-option
              v-for="item in menuList"
              :key="item.id"
              :label="item.title"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="菜单类型" :label-width="formLabelWidth">
          <el-radio v-model="form.type" :label="1" disabled>目录</el-radio>
          <el-radio v-model="form.type" :label="2" disabled>菜单</el-radio>
        </el-form-item>
        <el-form-item label="菜单图标" :label-width="formLabelWidth" v-if="form.pid == 0">
          <el-select
            v-model="form.icon"
            placeholder="请选择"
          >
            <el-option
              v-for="item in iconList"
              :key="item"
              :label="item"
              :value="item"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="菜单地址" :label-width="formLabelWidth" v-else>
          <el-select
            v-model="form.url"
            placeholder="请选择"
          >
            <el-option
              v-for="item in indexRoutes"
              :key="item.path"
              :label="item.name"
              :value="item.path"
            >
            </el-option>
          </el-select>
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
        <el-button @click="cancel" >取 消</el-button>
        <el-button @click="add" type="primary" v-if="addInfo.isAdd">添 加</el-button>
        <el-button @click="update('formDialog')" type="primary" v-else >编 辑</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
//引入二级路由
import { indexRoutes } from "../../router";
//引入封装好的接口
import { getMenuAdd } from "../../util/axios";
//引入辅助性函数
import { mapActions, mapGetters } from "vuex";
//引入一条数据接口
import{getMenuInfo} from '../../util/axios';
import{getMenuEdit} from '../../util/axios';

export default {
  data() {
    return {
      form: {
        title: "", //标题
        pid: 0, //上级分类编号 默认是0 是顶级
        icon: "", //图标
        type: 1, //类型1目录2菜单
        url: "", //菜单地址
        status: 1, //状态1正常2禁用
      },
      indexRoutes:indexRoutes,
      rules: {
        title: [
          { required: true, message: "请输入菜单名称", trigger: "blur" },
          {
            min: 2,
            max: 20,
            message: "长度在 2 到 20 个字符",
            trigger: "blur",
          },
        ],
        pid: [{ required: true, message: "请选择上级菜单", trigger: "blur" }],
      },
      iconList:[
        "el-icon-setting",
        "el-icon-goods",
        "el-icon-menu",
        "el-icon-tickets"
      ],
      formLabelWidth: "120px",
    };
  },
  props: ["addInfo"],
  methods: {
    ...mapActions({
      getMenuList: "menu/getMenuListAction",
    }),
    //重置事件
    reset(){
      this.form = {
        title: "", //标题
        pid: 0, //上级分类编号 默认是0 是顶级
        icon: "", //图标
        type: 1, //类型1目录2菜单
        url: "", //菜单地址
        status: 1, //状态1正常2禁用
      }
    },
    //取消事件，关闭弹框，修改父组件数据
    cancel() {
      this.$emit("cancel", false);
      this.reset()
    },
    add() {
      getMenuAdd(this.form).then((res) => {
        console.log(res, "添加响应");
        if (res.data.code == 200) {
          this.$message.success(res.data.msg);
          //关闭弹框
          this.cancel();
          //重新获取列表
          this.getMenuList();
        }
      });
    },
    changeRadio() {
      if (this.form.pid == 0) {
        this.form.type = 1;
      } else {
        this.form.type = 2;
      }
    },
     //查看一条事件
    look(id) {
      //调取查看列表
      getMenuInfo({ id }).then(res => {
        if (res.data.code == 200) {
          console.log(res.data.list);
          this.form = res.data.list;
          //当前表单没有id 创建一个id，给确定提交用
          this.form.id = id;
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
    //确定修改界面
    update(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          //修改逻辑
          //调取修改接口
          getMenuEdit(this.form).then(res => {
            console.log(res, "修改响应");
            if (res.data.code == 200) {
              this.$message.success(res.data.msg);
              //关闭弹框
              this.cancel();
              //重新获取列表
              this.getMenuList();
            } else {
              this.$message.error(res.data.msg);
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
  },
  //上级菜单
  computed: {
    ...mapGetters({
      menuList: "menu/getMenuList",
    }),
  },
};
</script>

<style lang="" scoped></style>
