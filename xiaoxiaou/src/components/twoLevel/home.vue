<template>
  <div>
    <van-nav-bar title="首页" />
    <!-- <header class="headCon">
      <div class="logo">
        <a href="javascript:;"><img :src="logo" alt="logo" /></a>
      </div>
      <input type="search" placeholder="寻找商品" />
      <p>
        <span></span>
        <span></span>
        <span></span>
      </p>
    </header> -->
    <!-- 导航 -->
    <nav class="navbar">
      <ul class="clearfix">
        <li><a class="ault" href="#">推荐</a></li>
        <li><a href="#">女装</a></li>
        <li><a href="#">女装</a></li>
        <li><a href="#">女装</a></li>
        <li><a href="#">女装</a></li>
        <li><a href="#">女装</a></li>
        <li><a href="#">女装</a></li>
        <li><a href="#">女装</a></li>
        <li><a href="#">女装</a></li>
      </ul>
      <p></p>
    </nav>
    <!-- 轮播图 -->
    <div class="banner">
      <van-swipe :autoplay="3000">
        <van-swipe-item v-for="(image, index) in bannerList" :key="index">
          <img v-lazy="$imgURL + image.img" />
        </van-swipe-item>
      </van-swipe>
    </div>
    <!-- 子导航 -->
    <van-grid :border="false" :column-num="4">
      <van-grid-item>
        <van-image :src="indexicon1" />
        <span>限时抢购</span>
      </van-grid-item>
      <van-grid-item>
        <van-image :src="indexicon2" />
        <span>积分商城</span>
      </van-grid-item>
      <van-grid-item>
        <van-image :src="indexicon3" />
        <span>联系我们</span>
      </van-grid-item>
      <van-grid-item to="/sort">
        <van-image :src="indexicon4" />
        <span>商品分类</span>
      </van-grid-item>
    </van-grid>
    <!-- 限时秒杀 -->
    <div class="limited">
      <div class="limiTimel clearfix">
        <h3>限时秒杀</h3>
        <p>每天零点场 好货秒不停</p>
        <p class="fl">
          <span>02</span>: <span>16</span>:
          <span>45</span>
        </p>
        <p class="fl"><a href="#">秒杀</a></p>
        <a href="#"><img :src="maojin" alt="毛巾" /></a>
      </div>
      <div class="limiTimer clearfix">
        <div class="shangxin">
          <div class="fl">
            <h3>品牌上新</h3>
            <p>每日9点 抢大牌</p>
            <img :src="brand" alt="图" />
          </div>
          <a class="fr" href="#"><img :src="indexshop" alt="衣服" /></a>
        </div>
        <div class="timerBot">
          <div>
            <h3>每日十件</h3>
            <p>只为你选好货</p>
            <a href="#"><img :src="shop_2" alt="衣服" /></a>
          </div>
          <div>
            <h3>拼啊</h3>
            <p>超级好价拼团</p>
            <a href="#"><img :src="shop_3" alt="衣服" /></a>
          </div>
        </div>
      </div>
    </div>
    <!-- 广告 -->
    <div class="ad">
      <a href="#"><img :src="bar" alt="烤箱" /></a>
    </div>
    <!-- main -->
    <van-tabs class="main" type="card">
      <van-tab title="热门推荐">
        <van-card
          v-for="item in hotList"
          :key="item.id"
          :price="item.market_price.toFixed(2)"
          :title="item.goodsname"
          :thumb="$imgURL + item.img"
        />
      </van-tab>
      <van-tab title="发现新品">
        <van-card
          v-for="item in findList"
          :key="item.id"
          :price="item.market_price.toFixed(2)"
          :title="item.goodsname"
          :thumb="$imgURL + item.img"
        />
      </van-tab>
      <van-tab title="所有商品">
        <van-card v-for="item in allList"
          :key="item.id"
          :price="item.market_price.toFixed(2)"
          :title="item.goodsname"
          :thumb="$imgURL+item.img"
        />
      </van-tab>
    </van-tabs>
    <!-- <div class="main">
      <div class="subMenur">
        <div v-for="item in indexList" :key="item.id">{{ item.tabTitle }}</div>
      </div>
      <ul>
        <li
          class="clearfix"
          @click="goDetails"
          v-for="list in navList"
          :key="list.id"
        >
          <div class="fl">
            <img :src="list.img" alt="护肤" />
          </div>
          <div class="fl">
            <h4>{{ list.oneTitle }}</h4>
            <p>&yen;{{ list.price }}</p>
            <p>{{ list.num }}</p>
            <a href="confirm.html">立即抢购</a>
          </div>
        </li>
      </ul>
    </div> -->
  </div>
</template>

<script>
import { getBanner, getIndexgoods } from "../../util/axios";
import Vue from "vue";
import { Form, Lazyload } from "vant";
import { Tab, Tabs } from "vant";

// Vue.use(Tab);
// Vue.use(Tabs);

Vue.use(Lazyload);
export default {
  data() {
    return {
      //轮播图数据
      bannerList: [],
      //热门推荐
      hotList: [],
      //发现新品
      findList: [],
      //所有商品
      allList: [],
      logo: require("../../assets/images/logo.jpg"),
      banner: require("../../assets/images/index/banner.jpg"),
      indexicon1: require("../../assets/images/index/indexicon1.jpg"),
      indexicon2: require("../../assets/images/index/indexicon2.jpg"),
      indexicon3: require("../../assets/images/index/indexicon3.jpg"),
      indexicon4: require("../../assets/images/index/indexicon4.jpg"),
      maojin: require("../../assets/images/index/cts-200820153423170.jpg"),
      brand: require("../../assets/images/index/brand.jpg"),
      indexshop: require("../../assets/images/index/indexshop.jpg"),
      shop_2: require("../../assets/images/index/shop_2.jpg"),
      shop_3: require("../../assets/images/index/shop_3.jpg"),
      bar: require("../../assets/images/index/bar.jpg"),

      indexList: [
        {
          id: 1,
          tabTitle: "热门推荐",
        },
        {
          id: 2,
          tabTitle: "发现好货",
        },
        {
          id: 3,
          tabTitle: "只看专场",
        },
        {
          id: 4,
          tabTitle: "只看商品",
        },
      ],
      navList: [
        {
          id: 5,
          img: require("../../assets/images/index/shop_4.jpg"),
          oneTitle: "雅诗兰黛染发膏60ml",
          price: "123.00",
          num: "已售800件",
        },
        {
          id: 6,
          img: require("../../assets/images/index/shop_4.jpg"),
          oneTitle: "雅诗兰黛染发膏60ml",
          price: "123.00",
          num: "已售800件",
        },
        {
          id: 7,
          img: require("../../assets/images/index/shop_4.jpg"),
          oneTitle: "雅诗兰黛染发膏60ml",
          price: "123.00",
          num: "已售800件",
        },
      ],
    };
  },
  mounted() {
    //执行轮播图接口
    this.getBannerList();
    this.getIndexgoodsList();
  },
  methods: {
    //封装轮播图接口
    getBannerList() {
      getBanner().then((res) => {
        if (res.data.code == 200) {
          this.bannerList = res.data.list;
        }
      });
    },
    getIndexgoodsList() {
      getIndexgoods().then((res) => {
        if (res.data.code == 200) {
          console.log(res);
          this.hotList = res.data.list[0].content;
          this.findList = res.data.list[1].content;
          this.allList = res.data.list[2].content;
        }
      });
    },
    goSort() {
      this.$router.push("/sort");
    },
    goDetails() {
      this.$router.push("/details");
    },
  },
};
</script>

<style lang="" scoped>
@import "../../assets/css/index.css";
.main {
  margin-bottom: 1.17rem;
}
.banner img[data-v-a0b175d4] {
  height: 150px;
}
.van-image {
  width: 32px;
}
</style>