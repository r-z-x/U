<template>
  <!-- <div class="button">
    <li v-for="(item, i) in iconList" :key="item.id" @click="tab(i)">
      <router-link :to="item.rou">
        <img :src="[num == i ? item.img2 : item.img1]" alt="" />
        <p :class="[num == i ? 'tabCol' : '']">{{ item.name }}</p>
      </router-link>
    </li>
  </div> -->
  <van-tabbar route v-model="active" @change="onChange">
    <van-tabbar-item to="/home" icon="bag">首页</van-tabbar-item>
    <van-tabbar-item to="/shop" icon="shopping-cart">购物车</van-tabbar-item>
    <van-tabbar-item to="/mine" icon="friends">我的</van-tabbar-item>
  </van-tabbar>
</template>

<script>
export default {
  methods: {
    // tab(i) {
    //   this.num = i;
    // },
    onChange(index) {
      console.log(index);
    },
  },
  data() {
    return {
      active: 0,
      // num: 0,
      // iconList: [
      //   {
      //     id: 1,
      //     img1: require("../assets/images/index/iconIndex.jpg"),
      //     img2: require("../assets/images/index/iconIndex2.jpg"),
      //     name: "首页",
      //     rou: "/home",
      //   },
      //   {
      //     id: 2,
      //     img1: require("../assets/images/index/iconCart.jpg"),
      //     img2: require("../assets/images/index/iconCart2.jpg"),
      //     name: "购物车",
      //     rou: "/shop",
      //   },
      //   {
      //     id: 3,
      //     img1: require("../assets/images/index/iconMine.jpg"),
      //     img2: require("../assets/images/index/iconMine2.jpg"),
      //     name: "我的",
      //     rou: "/mine",
      //   },
      // ],
    };
  },
};
</script>

<style lang="" scoped>
@import "../assets/css/index.css";
.button li:nth-of-type(3) img {
  width: 0.52rem;
  height: 0.58rem;
}
.button li:nth-of-type(2) img {
  width: 0.56rem;
  height: 0.53rem;
}
.button li:nth-of-type(1) img {
  width: 0.53rem;
  height: 0.56rem;
}
.button a p {
  padding: 0.12rem 0 0 0;
  font: 0.2rem "微软雅黑";
  color: #898989;
}
.button a {
  display: block;
  text-align: center;
  padding: 0.2rem 0 0.15rem 0;
}
.van-tabbar-item--active {
  color: #f7520e !important;
}
</style>