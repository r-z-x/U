<template>
  <div class="page">
    <!-- 头部 -->
    <!-- <header class="headCon">
      <a href="javascript:;">
        <img src="@/assets/images/list/arrowLeft.jpg" alt="后退" />
      </a>
      <div class="logo">
        <a href="#"><img src="@/assets/images/logo.jpg" alt="logo" /></a>
      </div>
      <p>
        <span></span>
        <span></span>
        <span></span>
      </p>
    </header> -->
    <!-- 搜索 -->
    <van-nav-bar
      :title="$route.meta.name"
      left-arrow
      @click-left="$router.back()"
    />
    <div class="search">
      <input type="search" placeholder="搜索商品" />
    </div>
    <!-- 商品列表 -->
    <van-card
      v-for="item in goodsList"
      :key="item.id"
      :price="item.market_price"
      :title="item.goodsname"
      :thumb="$imgURL+item.img"
      @click="toDetails(item.id)"
    />
    <!-- <ul>
      <li>
        <a href="javascript:;">
          <div>
            <img src="@/assets/images/list/pic.jpg" alt="洗发水" />
          </div>
          <div>
            <p>
              阿道夫修护滋养洗发香乳 洗发水 持久留香520ml*2瓶
              旗舰店正品焕新升级款
            </p>
            <p>&yen;123.00</p>
            <p>3625<span>条评论</span></p>
          </div>
        </a>
      </li>
      <li>
        <a href="javascript:;">
          <div>
            <img src="@/assets/images/list/pic.jpg" alt="洗发水" />
          </div>
          <div>
            <p>
              阿道夫修护滋养洗发香乳 洗发水 持久留香520ml*2瓶
              旗舰店正品焕新升级款
            </p>
            <p>&yen;123.00</p>
            <p>3625<span>条评论</span></p>
          </div>
        </a>
      </li>
      <li>
        <a href="javascript:;">
          <div>
            <img src="@/assets/images/list/pic.jpg" alt="洗发水" />
          </div>
          <div>
            <p>
              阿道夫修护滋养洗发香乳 洗发水 持久留香520ml*2瓶
              旗舰店正品焕新升级款
            </p>
            <p>&yen;123.00</p>
            <p>3625<span>条评论</span></p>
          </div>
        </a>
      </li>
      <li>
        <a href="javascript:;">
          <div>
            <img src="@/assets/images/list/pic.jpg" alt="洗发水" />
          </div>
          <div>
            <p>
              阿道夫修护滋养洗发香乳 洗发水 持久留香520ml*2瓶
              旗舰店正品焕新升级款
            </p>
            <p>&yen;123.00</p>
            <p>3625<span>条评论</span></p>
          </div>
        </a>
      </li>
    </ul> -->
  </div>
</template>

<script>
import {getGoods} from '../../util/axios'
export default {
    data(){
      return{
        goodsList:[]
      }
    },
    mounted() {
      this.getGoodsList()
    },
    methods:{
      getGoodsList() {
        // console.log(this.$route.query);
        getGoods({
          fid:this.$route.query.id
        }).then(res=>{
          if(res.data.code==200){
            this.goodsList = res.data.list
          }
        })
      },
      toDetails(id){
        this.$router.push({
          path:'/details',
          query:{
            id
          }
        })
      }
    }
}
</script>

<style lang="" scoped>
@import "../../assets/css/list.css";
</style>