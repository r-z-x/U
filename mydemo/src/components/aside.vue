<template>
    <div>
        <el-aside width="205px">
          <el-menu
            :default-active="defaultActive"
            class="el-menu-vertical-demo"
            background-color="#663366"
            text-color="#fff"
            unique-opened
            active-text-color="#CC99CC"
            router>
            <el-menu-item index="/home">
              <i class="el-icon-menu"></i>
              <span slot="title">首页</span>
            </el-menu-item>
            <el-submenu :index="item.id.toString()" v-for="item in getUserInfo.menus" :key="item.id">
              <template slot="title">
                <i :class="item.icon"></i>
                <span>{{item.title}}</span>
              </template>
              <el-menu-item-group>
                <el-menu-item :index="menu.url" v-for="menu in item.children" :key="menu.id">{{menu.title}}</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
          </el-menu>
        </el-aside>
    </div>
</template>

<script>
import {mapActions,mapGetters} from 'vuex'
export default {
    data() {
      return {
        defaultActive:'/home',
      }
    },
    mounted(){
      //console.log(this.$route,'路由源信息')
      this.defaultActive = this.$route.path
      //组件一触发就调用action
      // this.changeUserInfo()
      //  console.log(this.getUserInfo);
    },
    methods:{
      // ...mapActions(['changeUserInfo'])
    },
    computed:{
      ...mapGetters(['getUserInfo'])
    },
}
</script>

<style lang="stylus" scoped>
.el-menu
    height 85vh
</style>