<template>
    <div>
        <el-bread></el-bread>
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