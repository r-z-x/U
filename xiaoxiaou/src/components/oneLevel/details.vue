<template>
  <div class="page" v-if="goodsList.length != 0">
    <!-- 头部 -->
    <van-nav-bar
      :title="$route.meta.name"
      left-arrow
      @click-left="$router.back()"
    />
    <!-- <header class="headCon">
      <a href="javascript:;">
        <img src="@/assets/images/arrowLeft22.jpg" alt="后退" />
      </a>
      <div class="logo"><p>商品详情</p></div>
      <p>
        <span></span>
        <span></span>
        <span></span>
      </p>
    </header> -->
    <div class="banner">
      <img :src="$imgURL + goodsList.img" alt="头图" />
    </div>
    <section>
      <h3 v-html="goodsList.description"></h3>
      <p>
        &yen;{{ goodsList.market_price.toFixed(2)
        }}<span>(此价格不与套装优惠同时享受)</span>
      </p>
    </section>
    <!-- 商品规格选择 -->
    <div class="menu">
      <div>
        <p class="clearfix">
          促销:
          <span>满减</span>
          <span>满2件9折;3件8折</span>
          <a class="fr" href="javascript:;"
            ><img src="@/assets/images/arrow.jpg" alt="下"
          /></a>
        </p>
        <ul>
          <li>
            <p>购买数量</p>
          </li>
          <li class="clearfix">
            <van-stepper v-model="form.num" />
          </li>
        </ul>
        <p class="clearfix">
          商品属性
          <a class="fr" href="#"
            ><img src="@/assets/images/arrow.jpg" alt="下"
          /></a>
        </p>
        <div>
          <p>
            <span>{{ goodsList.specsname }}</span>
            <van-tag
              type="primary"
              :key="index"
              v-for="(item, index) in goodsList.specsattr.split(',')"
              size="large"
              >{{ item }}</van-tag
            >
          </p>
        </div>
      </div>
    </div>
    <nav class="main">
      <h3>商品详情</h3>
      <img src="@/assets/images/details/picDetail_3.jpg" alt="商品图片" />
      <img src="@/assets/images/details/picDetail_4 .jpg" alt="商品图片" />
      <img src="@/assets/images/details/picDetail_5.jpg" alt="商品图片" />
      <img src="@/assets/images/details/picDetail_6.jpg" alt="商品图片" />
      <img src="@/assets/images/details/picDetail_7.jpg" alt="商品图片" />
    </nav>
    <div class="evaluate">
      <h3>商品评价</h3>
      <ul>
        <li>1235668fg</li>
        <li>效果很好物流到位，下次继续来！</li>
        <li>
          <img src="@/assets/images/details/picDetail_8.jpg" alt="评论图" />
          <img src="@/assets/images/details/picDetail_9.jpg" alt="评论图" />
          <img src="@/assets/images/details/picDetail_10.jpg" alt="评论图" />
        </li>
        <li>2020-01-13</li>
      </ul>
      <p>
        <span>共<i>1000+</i>条评论</span>
        <span><a href="javascript:;">查看更多></a></span>
      </p>
    </div>
    <!-- 飘窗 -->
    <ul class="detBay">
      <li>
        <a href="javascript:;">
          <img src="@/assets/images/index/iconCart.jpg" alt="图标" />
          <p @click="toShop">购物车</p>
        </a>
      </li>
      <li><a href="javascript:;" @click="joinShop">加入购物车</a></li>
      <li><a href="javascript:;">立即购买</a></li>
    </ul>
  </div>
</template>

<script>
import { getGoodsinfo, getCartadd } from "../../util/axios";
import axios from "axios";
import { Toast } from "vant";
export default {
  data() {
    return {
      goodsList: [],
      form: {
        num: 1,
      },
    };
  },
  mounted() {
    this.getGoodsinfoList();
    // axios.all(getGoodsinfo(this.$route.query), getCartadd()).then((res) => {});
  },
  methods: {
    getGoodsinfoList() {
      getGoodsinfo(this.$route.query).then((res) => {
        if (res.data.code == 200) {
          this.goodsList = res.data.list[0];
        }
      });
    },
    joinShop() {
      let uid = JSON.parse(sessionStorage.getItem("userInfo")).uid;
      this.form.uid = uid;
      this.form.goodsid = this.goodsList.id;
      console.log(this.form);
      getCartadd(this.form).then((res) => {
        if (res.data.code == 200) {
          Toast.success("添加成功");
        }
      });
    },
    toShop() {
      this.$router.push("/shop");
    },
  },
};
</script>

<style lang="" scoped>
@import "../../assets/css/details.css";
</style>