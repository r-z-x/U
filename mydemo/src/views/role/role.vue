<template>
    <div>
        <el-bread></el-bread>
        <el-button type="primary" size="small" @click="addCon">添加</el-button>
        <table-bar @edit="edit"></table-bar>
        <add-bar :addInfo="addInfo" @cancel="cancel" ref="dialog"></add-bar>
    </div>
</template>

<script>
import elBread from '../../components/el-bread'
import tableBar from './list'
import addBar from './add'
export default {
    data() {
        return {
            addInfo:{
                isShow:false,
                isAdd:true
            }
        }
    },
     components:{
         elBread,
         tableBar,
         addBar
    },
    methods:{
        addCon(){
            this.addInfo.isShow = true;
            this.addInfo.isAdd = true;
        },
        cancel(e){
            this.addInfo.isShow = e;
        },
        edit(e){
            this.addInfo.isShow = true;
            this.addInfo.isAdd = false;
            this.$refs.dialog.look(e)
        }
    }
}
</script>

<style lang="stylus" scoped>
.el-button
    margin-bottom 20px
</style>