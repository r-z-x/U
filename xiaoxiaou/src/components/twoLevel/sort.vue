<template>
  <div class="page">
    <!-- 头部 -->
    <!-- <header class="headCon">
      <a href="javascript:;">
        <img src="@/assets/images/arrowLeft22.jpg" alt="后退" />
      </a>
      <div class="logo"><p>商品分类</p></div>
      <p>
        <span></span>
        <span></span>
        <span></span>
      </p>
    </header> -->
    <van-nav-bar
      :title="$route.meta.name"
      left-arrow
      @click-left="$router.back()"
    />
    <!-- 侧边栏+商品 -->
    <div class="main">
      <!-- 侧边栏 -->
      <van-sidebar v-model="activeKey" @change="onChange">
        <van-sidebar-item
          v-for="item in firstList"
          :key="item.id"
          :title="item.catename"
        />
      </van-sidebar>
      <!-- <aside class="sideBar">
        <ul>
          <li><a href="#">施华蔻</a></li>
          <li><a href="#">沙宣</a></li>
          <li><a href="#">沙宣</a></li>
          <li><a href="#">沙宣</a></li>
          <li><a href="#">沙宣</a></li>
          <li><a href="#">沙宣</a></li>
          <li><a href="#">沙宣</a></li>
          <li><a href="#">沙宣</a></li>
          <li><a href="#">沙宣</a></li>
        </ul>
      </aside> -->
      <!-- 商品内容 -->
      <van-grid :border="false" :column-num="3">
        <van-grid-item :to="'/list/?id='+item.id" v-for="item in secondList" :key="item.id">
          <van-image :src="$imgURL + item.img" />
          <span>{{ item.catename }}</span>
        </van-grid-item>
      </van-grid>
      <!-- <nav>
        <div class="nav">
          <h3>
            <span>洗发类</span>
            <a @click="goList" href="javascript:;">更多></a>
          </h3>
          <ul class="navTop clearfix">
            <li>
              <a href="javascript:;">
                <img
                  src="@/assets/images/classification/shopClassify_2.jpg"
                  alt="商品"
                />
                <p>护亮泽洗发水</p>
              </a>
            </li>
            <li>
              <a href="javascript:;">
                <img
                  src="@/assets/images/classification/shopClassify_2.jpg"
                  alt="商品"
                />
                <p>护亮泽洗发水</p>
              </a>
            </li>
            <li>
              <a href="javascript:;">
                <img
                  src="@/assets/images/classification/shopClassify_2.jpg"
                  alt="商品"
                />
                <p>护亮泽洗发水</p>
              </a>
            </li>
            <li>
              <a href="javascript:;">
                <img
                  src="@/assets/images/classification/shopClassify_2.jpg"
                  alt="商品"
                />
                <p>护亮泽洗发水</p>
              </a>
            </li>
            <li>
              <a href="javascript:;">
                <img
                  src="@/assets/images/classification/shopClassify_2.jpg"
                  alt="商品"
                />
                <p>护亮泽洗发水</p>
              </a>
            </li>
            <li>
              <a href="javascript:;">
                <img
                  src="@/assets/images/classification/shopClassify_2.jpg"
                  alt="商品"
                />
                <p>护亮泽洗发水</p>
              </a>
            </li>
          </ul>
          <h3>
            <span>染发类</span>
            <a href="javascript:;">更多></a>
          </h3>
          <ul class="navBot clearfix">
            <li>
              <a href="javascript:;">
                <img
                  src="@/assets/images/classification/shopClassify_2.jpg"
                  alt="商品"
                />
                <p>护亮泽洗发水</p>
              </a>
            </li>
            <li>
              <a href="javascript:;">
                <img
                  src="@/assets/images/classification/shopClassify_2.jpg"
                  alt="商品"
                />
                <p>护亮泽洗发水</p>
              </a>
            </li>
            <li>
              <a href="javascript:;">
                <img
                  src="@/assets/images/classification/shopClassify_2.jpg"
                  alt="商品"
                />
                <p>护亮泽洗发水</p>
              </a>
            </li>
          </ul>
        </div>
      </nav> -->
    </div>
  </div>
</template>

<script>
import { getCatetree } from "../../util/axios";
export default {
  data() {
    return {
      activeKey: 0,
      firstList: [],
      secondList: [],
    };
  },
  mounted() {
    this.getCatetreeList();
  },
  methods: {
    goList() {
      this.$router.push("/list");
    },
    onChange(index) {
      console.log(index);
      this.secondList = this.firstList[index].children;
    },
    getCatetreeList() {
      getCatetree().then((res) => {
        console.log(res);
        this.firstList = res.data.list;
        this.secondList = res.data.list[this.activeKey].children;
      });
    },
  },
};
</script>


<style lang="" scoped>
@import "../../assets/css/sort.css";
.van-sidebar {
  width: 100px;
}
.main {
  display: flex;
}
.van-grid {
  flex: 1;
}
</style>