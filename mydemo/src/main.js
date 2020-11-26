// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

//引入vuex状态管理
import store from './store'

//引入elementUI和样式
import elementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

//给vue原型上挂载一个地址用于公用
Vue.prototype.$imgUrl = 'http://localhost:3000'

//全局引入样式重置
import './assets/css/reset.css'
//调用插件
Vue.use(elementUI)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
