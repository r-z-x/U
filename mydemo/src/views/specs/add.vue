<template>
  <div>
    <el-dialog
      :title="addInfo.isAdd ? '添加商品规格' : '修改商品规格'"
      :visible.sync="addInfo.isShow"
      :before-close="cancel"
      center
    >
      <el-form :model="form" :rules="rules">
        <el-form-item
          prop="specsname"
          label="规格名称:"
          :label-width="formLabelWidth"
        >
          <el-input v-model="form.specsname" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item
          v-for="(item, index) in arrAttr"
          :key="index"
          label="规格属性:"
          :label-width="formLabelWidth"
        >
          <el-input
            class="inputW"
            v-model="item.value"
            autocomplete="off"
          ></el-input>
          <el-button class="addAttr" v-if="index==0" @click="addAttr" type="primary">新增规格属性</el-button>
          <el-button v-else @click="delAttr(item)" type="danger">删除</el-button>
        </el-form-item>
        <el-form-item label="状态:" :label-width="formLabelWidth">
          <el-switch
            v-model="form.status"
            active-color="#13ce66"
            inactive-color="#ff4949"
            :active-value="1"
            :inactive-value="2">
          </el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button v-if="addInfo.isAdd" @click="add" type="primary">添 加</el-button>
        <el-button v-else @click="update" type="primary">修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { getSpecsAdd, getSpecsInfo, getSpecsEdit } from "../../util/axios";
export default {
  data() {
    return {
      arrAttr: [
        {
          value: ""
        }
      ],
      form: {
        specsname: "",
        attrs: "", 
        status: 1 
      },
      formLabelWidth: "120px",
      rules: {
        specsname: [
          { required: true, message: "请输入规格名称", trigger: "blur" },
          { min: 2, max: 8, message: "长度在 2 到 8 个字符", trigger: "blur" }
        ]
      }
    };
  },

  props: ["addInfo"],
  methods: {
    delattr(){
      
    },
    addAttr() {
      if(this.arrAttr.length<=6){
      this.arrAttr.push({
        value: ""
      });
      }else{
        this.$message.warning('最多只能添加6项！！！')
      }
      
    },
    //删除一行
    delAttr(item){

      var index = this.arrAttr.indexOf(item);
      // console.log(item);
      // console.log(index);
      if (index !== 0) {
        this.arrAttr.splice(index, 1);
      }
    },
    reset() {
      this.form = {
        specsname: "", 
        attrs: "", 
        status: 1 ,
      };
      this.arrAttr= [
        {
          value: ""
        }
      ]
    },
    cancel() {
      this.$emit("cancel", false);
      this.reset();
    },
    ...mapActions({
      getSpecsList: "specs/getSpecsAction",
      getCountAction: "specs/getCountAction"
    }),
    //添加事件
    add() {
      this.form.attrs = this.arrAttr.map(item=>item.value).join(',')
      getSpecsAdd(this.form).then(res => {
        if (res.data.code == 200) {
          this.$message.success(res.data.msg);
          this.getSpecsList();
          this.getCountAction();
          this.cancel();
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
    //封装一个查看一条数据的方法
    look(id) {
      getSpecsInfo({ id }).then(res => {
        // if (res.data.code == 200) {
          console.log(res);
          let data = res.data.list[0];
          this.form = data
          data.attrs.map((item,index)=>{
          //   console.log(item,'nihao ')
          //   //索引是0强制匹配第一项
            if(index==0){
              this.arrAttr[0].value = item
            }else{
              this.arrAttr.push({
                value:item
              })
            }
          })
        // }
      });
    },
    update() {
      // console.log(this.form);
      this.form.attrs=this.arrAttr.map((item)=>item.value).join(',')
      getSpecsEdit(this.form).then(res => {
        if (res.data.code == 200) {
          this.$message.success(res.data.msg);
          this.getSpecsList();
          // this.getCountAction();
          this.cancel();
        } else {
          this.$message.error(res.data.msg);
        }
      });
    }
  }
};
</script>

<style lang="" scoped>
.addAttr{
  width: 25%;
}
.inputW {
  width: 70%;
}
</style>
