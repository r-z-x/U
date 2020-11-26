<template>
  <div class="box">
    <el-form
      :model="userInfo"
      :rules="rules"
      ref="userInfo"
      label-width="100px"
      class="userInfo">
      <h2>U-Mall后台管理系统,欢迎您!</h2>
      <el-form-item label="用户名：" prop="username">
        <el-input v-model="userInfo.username" clearable></el-input>
      </el-form-item>
      <el-form-item label="密码：" prop="password">
        <el-input v-model="userInfo.password" clearable show-password></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="Login('userInfo')"
        >登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { mapActions } from "vuex"
import "../assets/css/login.css"
import { getUserLogin} from '../util/axios'
export default {
    data() {
        return {
            //表单输入参
            userInfo:{
                username:'',
                password:'',
            },
            //规则验证
            rules:{
                username: [
                    { required: true, message: '请输入用户名', trigger: 'blur' },
                    { min: 2, max: 15, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                ],
                //密码验证
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' },
                    { min: 5, max: 20, message: '长度在 3 到 6 个字符', trigger: 'blur' }
                ],
            }
        }
    },
  
    methods:{
        ...mapActions(['changeUserInfo']),
        Login(formCon){
            //validate 验证
            this.$refs[formCon].validate(valid=>{
                if(valid) {
                    getUserLogin(this.userInfo).then(res=>{
                      if(res.data.code==200){
                        //登录成功之后存值到本地
                        // console.log(res.data.list);
                        // sessionStorage.setItem('userInfo',JSON.stringify(res.data.list))
                        this.changeUserInfo(res.data.list)
                        this.$message.success(res.data.msg)
                        this.$router.push('/home')
                      }else{
                        this.$message.error(res.data.msg)
                      }
                    })
                    
                }else{
                    return false
                }
            })
        }
    }
};
</script>
<style  scoped>
.el-button--primary{
    width: 200px !important;
    margin-left: 85px !important;
}
</style>
