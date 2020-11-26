<template>
  <div>
    <el-dialog
      :title="addInfo.isAdd ? '添加商品' : '修改商品'"
      :visible.sync="addInfo.isShow"
      :before-close="cancel"
      @opened='createEditor'
      center>
      <el-form :model="form" ref='rules' :rules="rules">
        <el-form-item
          prop="first_cateid"
          :label-width="formLabelWidth"
          label="一级分类">
          <el-select v-model="form.first_cateid" @change="changeCate">
            <el-option value label="请选择" disabled></el-option>
            <!-- 调取商品分类的列表接口 -->
            <el-option
              v-for="item in cateList"
              :key="item.id"
              :label="item.catename"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          prop="second_cateid"
          :label-width="formLabelWidth"
          label="二级分类">
          <el-select v-model="form.second_cateid">
            <!-- 二级分类一定是根据一级分类选择之后的联动信息 -->
            <el-option value label="请选择" disabled></el-option>
            <el-option
              v-for="item in secondArr"
              :key="item.id"
              :label="item.catename"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          prop="goodsname"
          label="商品名称:"
          :label-width="formLabelWidth">
          <el-input v-model="form.goodsname" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item
          prop="price"
          label="商品价格:"
          :label-width="formLabelWidth">
          <el-input v-model.number="form.price" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item
          prop="market_price"
          label="市场价格:"
          :label-width="formLabelWidth">
          <el-input
            v-model.number="form.market_price"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item
          prop="specsname"
          label="图片:"
          :label-width="formLabelWidth">
          <el-upload
            action="#"
            list-type="picture-card"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
            :auto-upload="false"
            :on-change="onChange"
            :file-list="fileList"
            :limit="1"
            :on-exceed="onExceed">
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="" />
          </el-dialog>
        </el-form-item>
        <el-form-item
          prop="specsid"
          :label-width="formLabelWidth"
          label="商品规格">
          <el-select v-model="form.specsid" @change="changeSpecs">
            <el-option value label="请选择" disabled></el-option>
            <!-- 调取商品规格列表接口 -->
            <el-option
              v-for="item in specsList"
              :key="item.id"
              :label="item.specsname"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          prop="specsattr"
          :label-width="formLabelWidth"
          label="规格属性">
          <!-- multiple	是否多选 -->
          <el-select v-model="form.specsattr" multiple>
            <el-option value label="请选择" disabled></el-option>
            <!-- 循环联动选择的规格 -->
            <el-option
              v-for="item in attrArr"
              :key="item"
              :label="item"
              :value="item">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="是否新品">
          <el-radio v-model="form.isnew" :label="1">是</el-radio>
          <el-radio v-model="form.isnew" :label="2">否</el-radio>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="是否热卖">
          <el-radio v-model="form.ishot" :label="1">是</el-radio>
          <el-radio v-model="form.ishot" :label="2">否</el-radio>
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
        <el-form-item label="商品描述:" :label-width="formLabelWidth">
          <div id="editor"></div>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button v-if="addInfo.isAdd" @click="add" type="primary"
          >添 加</el-button>
        <el-button v-else @click="update" type="primary">修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import E from 'wangeditor'
import { mapActions, mapGetters } from "vuex";
import { getGoodsAdd, getGoodsInfo, getGoodsEdit } from "../../util/axios";
export default {
  data() {
    return {
      editor:null,
      form: {
         first_cateid: "", //一级分类编号
        second_cateid: "", //二级分类编号
        goodsname: "", 
        price: "", 
        market_price: "", //市场价格
        img: "", 
        description: "", //商品描述
        specsid: "", //商品规格编号
        specsattr: "", //商品规格属性
        isnew: 1, 
        ishot: 1, 
        status: 1 
      },
      formLabelWidth: "120px",
      rules: {
        goodsname: [
          { required: true, message: "请输入商品名称", trigger: "blur" },
          { min: 2, max: 8, message: "长度在 2 到 8 个字符", trigger: "blur" }
        ],
        price: [
          { required: true, message: "请输入商品价格", trigger: "blur" },
          { type: "number", message: "商品价格必须为数字" }
        ],
        market_price: [
          { required: true, message: "请输入市场价格", trigger: "blur" },
          { type: "number", message: "市场价格必须为数字" }
        ],
        first_cateid: [
          { required: true, message: "请选择一级分类", trigger: "blur" }
        ],
        second_cateid: [
          { required: true, message: "请选择二级分类", trigger: "blur" }
        ],
        specsid: [
          { required: true, message: "请选择商品规格", trigger: "blur" }
        ],
        specsattr: [
          { required: true, message: "请选择规格属性", trigger: "blur" }
        ]
      },
      dialogImageUrl: "", //图片地址
      dialogVisible: false, //是否打开弹框
      imgUrl: "", 
      fileList: [], 
      secondArr: [], //二级分类数组
      attrArr: [] //规格属性数组
    };
  },

  props: ["addInfo"],

  methods: {
 
    createEditor(){
      //实例化富文本
      this.editor = new E("#editor")
      //使用create方法
      this.editor.create();
      //设置内容
      this.editor.txt.html(this.form.description);
      // console.log(this.editor);
    },

    changeCate(n) {
      let index = this.cateList.findIndex((item, i) => {
        return this.form.first_cateid == item.id;
      });
      this.secondArr = this.cateList[index].children;
      //进项联动判空。如果选择了别的一级，那么清空上一次二级的选择值
      if(!n){
        this.form.second_cateid = ""
      }
    },

    changeSpecs(n) {
      // console.log(n, "specs,iddd");
      let index = this.specsList.findIndex(item => this.form.specsid == item.id);
      this.attrArr = this.specsList[index].attrs;
      if(!n){
        this.form.specsattr = []
      }
      
    },

    handleRemove(file, fileList) {
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },

    onChange(file) {
      this.imgUrl = file.raw;
    },
    onExceed(files, fileList) {
      this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`
      );
    },
    reset() {
      this.form = {
        first_cateid: "", //一级分类编号
        second_cateid: "", //二级分类编号
        goodsname: "", 
        price: "", 
        market_price: "", //市场价格
        img: "", 
        description: "", //商品描述
        specsid: "", //商品规格编号
        specsattr: "", //商品规格属性
        isnew: 1, 
        ishot: 1, 
        status: 1 
      };
      this.fileList=[]
      this.secondArr=[]
      this.attrArr=[]

      //清空规则验证 关闭弹框 调resetFields()函数清空验证
      this.$refs["rules"].resetFields();
    },
    cancel() {
      this.$emit("cancel", false);
      this.reset();
    },
    
  
 ...mapActions({
      getSpecsList: "specs/getNewSpecsAction",
      getCateList: "cate/getCateListAction",
      getGoodsAction:'goods/getGoodsAction',
      getCountAction:'goods/getCountAction'
    }),
    add() {
      console.log(this.form);
      // this.form.specsattr = this.form.specsattr ? this.form.specsattr.join(",") : "";
      
      this.form.img = this.imgUrl;
      this.form.description = this.editor.txt.html();
      let data = this.form;
      let file = new FormData();
      for (let i in data) {
        file.append(i, data[i]);
      }
      file.append('img',this.imgUrl)
      getGoodsAdd(file).then(res => {
        if (res.data.code == 200) {
          this.$message.success(res.data.msg);
          this.getGoodsAction();
          this.getCountAction();
          this.cancel();
        } else {
          this.$message.error(res.data.msg);
        }
      });
    },
    look(id) {
      getGoodsInfo({ id }).then(res => {
        if (res.data.code == 200) {
          // console.log(res,'resres');
          // console.log(id,'idid');
          this.form =  res.data.list;
          this.form.id = id;
          //打开弹窗给图片列表赋值
          // this.fileList = this.form.img ? [{url:this.$imgUrl+this.form.img}]:[];
        this.fileList = this.form.img ? [{url:`${this.$imgUrl}${this.form.img}`}]:[];
          this.form.specsattr = this.form.specsattr? this.form.specsattr.split(","):[]
          //   //重新调去change事件
          this.changeCate(true);
          this.changeSpecs(true);
            //  console.log(this.form);
        }
      });
    },
    update() {
      // this.form.specsattr = this.form.specsattr? this.form.specsattr.join(","):""
     
      this.form.description = this.editor.txt.html();

      let data = this.form;
      let file = new FormData();
      for (let i in data) {
        file.append(i, data[i]);
      }
       file.append('img',this.imgUrl)
      //  console.log(res,'res');
           console.log(this.form,'file');
      getGoodsEdit(file).then(res => {
        if (res.data.code == 200) {
          this.$message.success(res.data.msg);
          this.getGoodsAction();
          this.getCountAction();
          this.cancel();
        } else {
          this.$message.error(res.data.msg);
        }
      });
    }
  },
    mounted() {
    this.getSpecsList();
    this.getCateList();
    this.getGoodsAction(),
    this.getCountAction()
    
  },
  computed: {
    ...mapGetters({
      cateList: "cate/getCateList",
      specsList: "specs/getNewSpecsList",
      gooslist:'goods/getGoodsList',

    })
    
  },
};
</script>

<style lang="" scoped>
.inputW {
  width: 70%;
}
</style>
