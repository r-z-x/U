<template>
  <div>
    <el-dialog
      :title="addInfo.isAdd ? '添加轮播图' : '编辑轮播图'"
      :visible.sync="addInfo.isShow"
      center>
      <el-form :model="form" :rules="rules" ref="formDialog">
        <el-form-item
          prop="title"
          label="标题:"
          :label-width="formLabelWidth"
        >
          <el-input v-model="form.title" autocomplete="off"></el-input>
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
import { getBannerInfo, getBannerAdd, getBannerEdit } from "../../util/axios";

export default {
  data() {
    return {
      form: {
        title: "",
        img: "",
        status: 1, 
      },
      imgUrl: "",
      fileList: [],
      dialogImageUrl: "",
      dialogVisible: false,
      indexRoutes: indexRoutes,
      rules: {
        title: [
          { required: true, message: "请输入轮播图标题", trigger: "blur" },
          {
            min: 1,
            max: 20,
            message: "长度在 1 到 20 个字符",
            trigger: "blur",
          },
        ],
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
      getBannerList: "banner/getBannerListAction",
    }),
    reset() {
      this.form = {
        title: "",
        img: "",
        status: 1, 
      };
      this.fileList=[]
    },
    cancel() {
      this.$emit("cancel", false);
      this.reset();
    },
     add(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          let data = this.form;
          let file = new FormData();
          //通过append添加属性
          for (let i in data) {
            file.append(i, data[i]);
          }
          file.append("img", this.imgUrl);
          getBannerAdd(file).then(res => {
            if (res.data.code == 200) {
              this.$message.success(res.data.msg);
              this.cancel();
              this.getBannerList();
            } else {
              this.$message.error(res.data.msg);
            }
          });
        } else {
          return false;
        }
      });
    },
    look(id) {
      getBannerInfo({ id }).then((res) => {
        if (res.data.code == 200) {
          this.form = res.data.list;
          //表单没有id 创建一个id
          this.form.id = id;

          //图片格式进行转化
          this.fileList = this.form.img ? [{ url: `${this.$imgUrl}${this.form.img}` }] : [];
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

          getBannerEdit(file).then(res => {
            console.log(res);
            if (res.data.code == 200) {
              this.$message.success(res.data.msg);
              this.cancel();
              this.getBannerList();
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
      bannerList: "banner/getBannerList",
    }),
  },
};
</script>

<style lang="" scoped></style>
