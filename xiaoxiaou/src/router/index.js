import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

//一级路由
// import Index from "../components/oneLevel/index"
// import Details from "../components/oneLevel/details"
// import Login from "../components/oneLevel/login"
// import Register from "../components/oneLevel/register"
//二级路由
// import Home from "../components/twoLevel/home";
// import Shop from "../components/twoLevel/shop";
// import Mine from "../components/twoLevel/mine";
// import Sort from "../components/twoLevel/sort";
// import Confirm from "../components/twoLevel/confirm";
// import List from "../components/twoLevel/list";

export default new Router({
    // mode: 'history',
    routes: [{
            path: '/index',
            component: () =>
                import ('@/components/oneLevel/index'),
            children: [{
                    path: '/home',
                    component: () =>
                        import ('@/components/twoLevel/home'),
                    meta: {
                        name: '首页'
                    }
                },
                {
                    path: '/shop',
                    component: () =>
                        import ('@/components/twoLevel/shop'),
                    meta: {
                        name: '购物车'
                    }
                },
                {
                    path: '/mine',
                    component: () =>
                        import ('@/components/twoLevel/mine'),
                    meta: {
                        name: '我的'
                    }
                },
                {
                    path: '/sort',
                    component: () =>
                        import ('@/components/twoLevel/sort'),
                    meta: {
                        name: '商品分类'
                    }
                },
                {
                    path: '/confirm',
                    component: () =>
                        import ('@/components/twoLevel/confirm'),
                    meta: {
                        name: '确认订单'
                    }
                },
                {
                    path: '/list',
                    component: () =>
                        import ('@/components/twoLevel/list'),
                    // beforeEnter: (to, from, next) => {
                    //     if (from.path == '/sort') {
                    //         next()
                    //     } else {
                    //         next('/sort')
                    //     }
                    // },
                    meta: {
                        name: '商品列表'
                    }
                },
                {
                    path: '',
                    redirect: '/home',
                    meta: {
                        name: '首页'
                    }
                },
            ]
        },
        {
            path: '/details',
            component: () =>
                import ('@/components/oneLevel/details'),
            meta: {
                name: '商品详情'
            }
        },
        {
            path: '/login',
            component: () =>
                import ('@/components/oneLevel/login'),
            meta: {
                name: '登录'
            }
        },
        {
            path: '/register',
            component: () =>
                import ('@/components/oneLevel/register'),
            meta: {
                name: '注册'
            }
        },
        {
            path: '*',
            redirect: '/index'
        },
    ]
})