// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

Vue.config.productionTip = false
import './assets/js/remScale'
import './assets/css/reset.css'
import 'animate.css'

import vantUI from 'vant'
import 'vant/lib/index.css'

//引入全局过滤器
// import allFilter from '../src/filter'
// Vue.filter(allFilter)
//实例化创建一个url地址
Vue.prototype.$imgURL = 'http://localhost:3000'

Vue.use(vantUI)

// router.beforeEach((to, from, next) => {
//     if (to.path == '/login' || to.path == '/register') {
//         next()
//         return
//     }
//     if (localStorage.getItem('set')) {
//         next()
//         return
//     }
//     next('/login')
// })


/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    components: { App },
    template: '<App/>'
})