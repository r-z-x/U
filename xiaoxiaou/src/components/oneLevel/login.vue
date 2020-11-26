<template>
  <div class="page">
    <header class="headCon">
      <a href="details.html"> &lt; </a>
      <div class="logo">
        <p>登录</p>
      </div>
      <p>
        <a href="javascript:;" @click="goRegister">注册</a>
      </p>
    </header>
    <div class="form">
      <ul>
        <li>
          <span>手机号</span><i>:</i
          ><input
            type="text"
            @blur="blur"
            @focus="focus"
            v-model="list.phone"
          />
          <p v-show="isShow">{{ errInfo }}</p>
        </li>
        <li>
          <span>密码</span><i>:</i
          ><input type="password" v-model="list.password" />
        </li>
        <li>
          <p>忘记密码</p>
        </li>
        <li>
          <button @click="login">登录</button>
        </li>
      </ul>
    </div>
  </div>
</template>


<script>
import { getLogin } from "../../util/axios";
import { Dialog,Toast } from 'vant';
export default {
  data() {
    return {
      errInfo: "",
      isShow: false,
      list: {
        phone: "",
        password: "",
      },
    };
  },
  methods: {
    login() {
      getLogin(this.list).then((res) => {
        if (res.data.code == 200) {
          Toast.success('登录成功');
          sessionStorage.setItem('userInfo',JSON.stringify(res.data.list))
          this.$router.push("/mine")
        } else {
          Dialog.alert({
            message: res.data.msg,
          }).then(() => {
            // on close
          });
        }
      });
    },
    blur() {
      if (!this.list.phone) {
        this.isShow = true;
        this.errInfo = "账号不能为空！";
      }
    },
    focus() {
      this.isShow = false;
    },
    goRegister() {
      this.$router.push("/register");
    },
  },
};
</script>

<style lang="" scoped>
@import "../../assets/css/login.css";
</style>