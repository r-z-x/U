<template>
  <div class="page">
    <!-- 头部 -->
    <!-- <header class="headCon">
      <a href="#">
        <img src="../../assets/images/arrowLeft22.jpg" alt="后退" />
      </a>
      <div class="logo"><p>我的订单</p></div>
      <p>
        <span></span>
        <span></span>
        <span></span>
      </p>
    </header> -->
    <!-- 头像 -->
    <van-nav-bar
      :title="$route.meta.name"
      left-text="返回"
      right-text="更多"
      left-arrow
      @click-left="$router.back()"
      @click-right="showPopup"
    />
    <van-row>
      <van-col span="8">
        <van-image
          round
          width="2.5rem"
          height="2.5rem"
          src="https://img.yzcdn.cn/vant/cat.jpeg"
        />
      </van-col>

      <van-col span="8" v-if="userInfo">
        <span class="name">{{ userInfo.nickname }}</span>
      </van-col>
      <van-col span="8" v-else>
        <span class="name"
          ><van-button
            to="/login"
            color="linear-gradient(to right, #ff6034, #ee0a24)"
          >
            去登录
          </van-button></span
        >
      </van-col>
    </van-row>
    <van-popup
      v-model="show"
      position="right"
      :style="{ width: '35%', height: '100%' }"
    >
      <button @click="quit" v-if="userInfo">退出</button>
    </van-popup>

    <!-- <div class="headLog">
      <div class="clearfix" @click="goLogin">
        <a class="fl" href="#"
          ><img src="../../assets/images/me/mine.png" alt="头像"
        /></a>
        <p class="fl">悠溯<span>v1</span></p>
      </div>
      <div>
        <p><a href="#">每日签到</a></p>
      </div>
    </div> -->
    <!-- 导航 -->
    <nav class="meNav">
      <a href="shop.html">
        <img src="../../assets/images/me/iconMine_1.jpg" alt="全部订单" />
        <p>全部订单</p>
      </a>
      <a href="confirm.html">
        <img src="../../assets/images/me/iconMine_2.jpg" alt="待发货" />
        <p>代付款</p>
      </a>
      <a href="#">
        <img src="../../assets/images/me/iconMine_3.jpg" alt="待收货" />
        <p>待收货</p>
      </a>
    </nav>
    <!-- 列表 -->
    <ul class="meList">
      <li>
        <a class="clearfix" href="#">
          <div class="fl">
            <p>地址管理</p>
          </div>
          <div class="fr">
            <img src="../../assets/images/me/arrowRight.jpg" alt="右" />
          </div>
        </a>
      </li>
      <li>
        <a class="clearfix" href="#">
          <div class="fl">
            <p>我的钱包</p>
          </div>
          <div class="fr clearfix">
            <p class="fl">200余额</p>
            <img
              class="fl"
              src="../../assets/images/me/arrowRight.jpg"
              alt="右"
            />
          </div>
        </a>
      </li>
      <li>
        <a class="clearfix" href="#">
          <div class="fl">
            <p>我的优惠券</p>
          </div>
          <div class="fr">
            <img src="../../assets/images/me/arrowRight.jpg" alt="右" />
          </div>
        </a>
      </li>
      <li>
        <a class="clearfix" href="#">
          <div class="fl">
            <p>我的二维码</p>
          </div>
          <div class="fr">
            <img src="../../assets/images/me/arrowRight.jpg" alt="右" />
          </div>
        </a>
      </li>
      <li>
        <a class="clearfix" href="#">
          <div class="fl">
            <p>我的小伙伴</p>
          </div>
          <div class="fr">
            <img src="../../assets/images/me/arrowRight.jpg" alt="右" />
          </div>
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
import { Dialog } from "vant";
export default {
  data() {
    return {
      show: false,
      userInfo: "",
    };
  },
  methods: {
    goLogin() {
      this.$router.push("/login");
    },
    showPopup() {
      this.show = true;
    },
    quit() {
      Dialog.confirm({
        message: "确定退出吗？",
      })
        .then(() => {
          sessionStorage.removeItem("userInfo");
          location.replace(document.referrer);
        })
        .catch(() => {
          // on cancel
        });
    },
  },
  mounted() {
    this.userInfo = sessionStorage.getItem("userInfo")
      ? JSON.parse(sessionStorage.getItem("userInfo"))
      : "";
    console.log(this.userInfo);
  },
};
</script>

<style lang="" scoped>
@import "../../assets/css/me.css";
.name {
  font-size: 0.7rem;
}
button {
  width: 100%;
  height: 0.9rem;
  background: #eee;
  margin-top: 1rem;
  border: none;
}
.van-row {
  display: flex;
  justify-content: space-between;
}
</style>