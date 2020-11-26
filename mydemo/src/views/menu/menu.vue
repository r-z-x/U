<template>
    <div>
        <el-bread></el-bread>
        <el-button type="primary" @click="addcon">添加</el-button>
        <add-bar :addInfo='addInfo' @cancel='del' ref="dialog"></add-bar>
        <table-bar @edit="edit"></table-bar>
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
            },
        }
    },
    components:{
        elBread,
        tableBar,
        addBar
    },
    methods:{
        addcon(){
            this.addInfo.isShow = true;
            this.addInfo.isAdd = true;
        },
        del(e){
            this.addInfo.isShow = e;
        },
        edit(e){
            this.addInfo.isShow = true;
            this.addInfo.isAdd = false
            this.$refs.dialog.look(e)
            // console.log(this.$refs);
        }
    }
}
</script>

<style lang="stylus" scoped>

</style>