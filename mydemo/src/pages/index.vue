<template>
  <div>
    <el-container>
      <el-header>U-Mall后台管理系统
        <div v-if="getUserInfo" class="userInfo">
          {{getUserInfo.username}} 欢迎您！
          <!-- <el-button @click="$router.push('/login')" type='danger' size='small'>退出</el-button> -->
          <el-button type="danger" @click="$router.push('/login')" icon="el-icon-s-custom" circle></el-button>
        </div>
      </el-header>
      <el-container>
        <aside-bar></aside-bar>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import {mapGetters} from 'vuex'
import asideBar from '../components/aside'
export default {
  data() {
    return {
      
    }
  },
  components:{
    asideBar,
  },
  computed:{
    ...mapGetters(['getUserInfo'])
  },

};
</script>

<style lang="stylus" scoped>
.el-header
    line-height 80px
    height 80px !important 
    background-color #CC99CC
    font-size 30px
    text-align center
.userInfo
  float right
  font-size 16px
  color darkslateblue

</style>