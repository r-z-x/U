<template>
  <div>
    <el-dialog
      :title="addInfo.isAdd ? '添加商品分类' : '编辑商品分类'"
      :visible.sync="addInfo.isShow"
      center>
      <el-form :model="form" :rules="rules" ref="formDialog">
        <el-form-item prop="pid" label="上级分类" :label-width="formLabelWidth">
          <el-select
            v-model="form.pid"
            placeholder="请选择">
            <el-option label="顶级分类" :value="0"></el-option>
            <el-option
              v-for="item in cateList"
              :key="item.id"
              :label="item.catename"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          prop="catename"
          label="分类名称"
          :label-width="formLabelWidth"
        >
          <el-input v-model="form.catename" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="图片" :label-width="formLabelWidth">
          <el-upload
            action="#"
            list-type="picture-card"
            :on-change="onChange"
            :on-exceed='onExceed'
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
            :auto-upload="false"
            :file-list="fileList">
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible" size="tiny">
            <img width="100%" :src="dialogImageUrl" alt="" />
          </el-dialog>
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
        <el-button @click="add('formDialog')" type="primary" v-if="addInfo.isAdd">添 加</el-button
        >
        <el-button @click="update('formDialog')" type="primary" v-else>编 辑</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>

<script>
//引入二级路由
import { indexRoutes } from "../../router";
import { mapActions, mapGetters } from "vuex";
import { getCateInfo, getCateAdd, getCateEdit } from "../../util/axios";

export default {
  data() {
    return {
      form: {
        pid: 0, //上级分类编号 默认是0 是顶级
        catename: "",
        img: "",
        status: 1, //状态1正常2禁用
      },
      imgUrl: "",
      fileList: [],
      dialogImageUrl: "",
      dialogVisible: false,
      indexRoutes: indexRoutes,
      rules: {
        catename: [
          { required: true, message: "请输入商品分类名称", trigger: "blur" },
          {
            min: 1,
            max: 20,
            message: "长度在 2 到 20 个字符",
            trigger: "blur",
          },
        ],
        pid: [{ required: true, message: "请选择上级分类", trigger: "blur" }],
      },
      formLabelWidth: "120px",
    };
  },
  props: ["addInfo"],
  methods: {
    onChange(file) {
      this.imgUrl = file.raw;
    },
    onExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${
          files.length + fileList.length
        } 个文件`
      );
    },
    handleRemove(file, fileList) {},
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    ...mapActions({
      getCateList: "cate/getCateListAction",
    }),
    reset() {
      this.form = {
        pid: 0, //上级分类编号 默认是0 是顶级
        catename: "",
        img: "",
        status: 1, //状态1正常2禁用
      };
      this.imgUrl=''
    },
    cancel() {
      this.$emit("cancel", false);
      this.reset();
    },
     add(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          //把表单改成FormData
          let data = this.form;
          let file = new FormData();
          //通过append添加属性
          for (let i in data) {
            file.append(i, data[i]);
          }
          file.append("img", this.imgUrl);
          getCateAdd(file).then(res => {
            if (res.data.code == 200) {
              this.$message.success(res.data.msg);
              this.cancel();
              this.getCateList();
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
    look(id) {
      getCateInfo({ id }).then((res) => {
        if (res.data.code == 200) {
          this.form = res.data.list;
          //表单没有id 创建一个id
          this.form.id = id;
          this.fileList=[{url:`${this.$imgUrl}${this.form.img}`}]
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
     update(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let data = this.form;
          let file = new FormData();

          for (let i in data) {
            file.append(i, data[i]);
          }

          this.imgUrl = this.imgUrl ? this.imgUrl : this.form.img;
          file.append("img", this.imgUrl);

          getCateEdit(file).then(res => {
            console.log(res);
            if (res.data.code == 200) {
              this.$message.success(res.data.msg);
              this.cancel();
              this.getCateList();
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
  computed: {
    ...mapGetters({
      cateList: "cate/getCateList",
    }),
  },
};
</script>

<style lang="" scoped></style>
