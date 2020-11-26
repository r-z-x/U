<template>
  <div class="page">
    <header class="headCon">
      <a href="javascript:;"> &lt; </a>
      <div class="logo">
        <p>注册</p>
      </div>
      <p>
        <a @click="goLogin" href="javascript:;">登录</a>
      </p>
    </header>
    <div class="form">
      <ul>
        <li>
          <span>昵称</span><i>:</i
          ><input @focus="focus" @blur="blur" type="text" v-model="list.nickname" />
          <p v-show="isShow">{{ errInfo }}</p>
        </li>
        <li>
          <span>手机号</span><i>:</i><input type="text" v-model="list.phone" />
        </li>
        <li>
          <span>密码</span><i>:</i
          ><input type="password" v-model="list.password" />
        </li>
        <li>
          <span>验证码</span><i>:</i><input type="text" />
          <div @click="toTime" id="time">{{ miao }}</div>
        </li>
        <li>
          <button @click="register">下一步</button>
        </li>
        <li>
          <input type="checkbox" v-model="list.isGree" />
          <a href="Javascript:;">我已阅读并同意使用条款和隐藏政策</a>
        </li>
      </ul>
    </div>
  </div>
</template>


<script>
import { getRegister } from "../../util/axios";
export default {
  data() {
    return {
      isShow: false,
      errInfo: "",
      onOff: true,
      miao: "发送验证码",
      list: {
        nickname: "",
        phone: "",
        password: "",
        isGree: true,
      },
    };
  },
  methods: {
    register() {
      if (
        !this.list.nickname ||
        !this.list.phone ||
        !this.list.password ||
        !this.list.isGree
      ) {
        this.blur();
      } else {
        getRegister(this.list).then((res) => {
          if (res.data.code == 200) {
            alert("注册成功");
            this.goLogin();
          }
        });
      }
    },
    blur() {
      if (!this.list.nickname) {
        this.isShow = true;
        this.errInfo = "用户名不能为空！";
      }
    },
    focus() {
      this.isShow = false;
    },
    goLogin() {
      this.$router.push("/login");
    },
    toTime() {
      let timer = null;
      let n = 60;

      if (this.onOff) {
        this.onOff = false;
      } else {
        return;
      }
      timer = setInterval(() => {
        n--;
        this.miao = n + "重新发送验证码";
        if (n <= 0) {
          clearInterval(timer);
          this.miao = "重新发送验证码";
          n = 60;
          this.onOff = true;
        }
      }, 1000);
    },
  },
};
</script>

<style lang="" scoped>
@import "../../assets/css/register.css";
#time {
  font: 0.25rem "微软雅黑";
  width: 5rem;
}
</style>