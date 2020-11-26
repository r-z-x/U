<template>
  <div class="page">
    <van-nav-bar title="购物车" left-arrow @click-left="$router.back()" />
    <!-- 商品列表 -->
    <div v-if="shopList && userInfo">
      <div class="box">
        <van-swipe-cell v-for="item in shopList" :key="item.id">
          <template>
            <van-checkbox class="left" v-model="tf"></van-checkbox>
          </template>
          <van-card
            :price="item.price.toFixed(2)"
            :title="item.goodsname"
            class="goods-card"
            :thumb="$imgURL + item.img"
          >
            <template #footer>
              <div>
                <van-stepper v-model="item.num" integer />
              </div>
            </template>
          </van-card>
          <template #right>
            <van-button
              square
              @click="del(item.id)"
              text="删除"
              type="danger"
              class="delete-button"
            />
          </template>
        </van-swipe-cell>
      </div>
      <div class="jiesuan">
        <van-checkbox @change="checkAll" v-model="allCheck"></van-checkbox>
        <div>
          <h3>
            <span>总计：</span><i>{{ allPrice }}</i>
          </h3>
          <p>不含运费，已优惠&yen;0.00</p>
        </div>
        <div>
          <button>去结算({{ sum }}件)</button>
        </div>
      </div>
    </div>
    <div v-else-if="!shopList && userInfo">
      <van-empty description="购物车空空如也，快去买买买！！！" />
    </div>
    <div v-else>
      <van-button @click="$router.push('/login')" type="warning"
        >请先登录，再查看</van-button
      >
    </div>
  </div>
</template>

<script>
import { getCartlist, getCartdelete } from "../../util/axios";
import { Toast } from "vant";
export default {
  methods: {
    checkAll() {
      this.tf = this.allCheck;
      // this.shopList.map((item) => (item.checked = this.allCheck));
    },
    remove(i) {
      // console.log(i);
      this.shopList.splice(i, 1);
    },
    // allcheck() {
    //   this.shopList.map((item) => (item.checkOne = this.tf));
    // },
    goConfirm() {
      this.$router.push("/confirm");
    },
    getCart() {
      // let uid;
      this.userInfo = JSON.parse(sessionStorage.getItem("userInfo")).uid;
      getCartlist({ uid: this.userInfo }).then((res) => {
        if (res.data.code == 200) {
          this.shopList = res.data.list;
        }
      });
    },
    del(id) {
      console.log(id);
      getCartdelete({ id }).then((res) => {
        if (res.data.code == 200) {
          this.getCart();
          Toast.success("删除成功");
        }
      });
    },
  },
  mounted() {
    this.getCart();
  },
  watch: {
    checked: {
      deep: true,
      handler() {
        // console.log(this.shopList);
        // this.allCheck=this.tf;

        // this.allCheck = this.shopList.every((item) => item.checked);
      },
    },
  },
  computed: {
    allPrice() {
      let n = 0;
      if (this.shopList) {
        this.shopList.map((item, i) => {
          n += item.price * item.num;
        });
        return n;
      }
    },
    sum() {
      let sum = 0;
      if (this.shopList) {
        this.shopList.map((item) => {
          sum += item.num;
        });
        return sum;
      }
    },
  },
  data() {
    return {
      allCheck: 0,
      value: 1,
      arrowLeft: require("../../assets/images/arrowLeft22.jpg"),
      shopList: [],
      userInfo: "",
      tf: 0,
    };
  },
};
</script>

<style lang="" scoped>
@import "../../assets/css/shop.css";
.delete-button {
  height: 100%;
}
.van-swipe-cell {
  padding-left: 1rem;
}
/* .van-checkbox */
.left {
  position: absolute;
  left: -0.7rem;
  top: 1rem;
}
</style>

<style lang="">
.van-swipe-cell__left {
  display: flex;
  align-items: center;
}
</style>