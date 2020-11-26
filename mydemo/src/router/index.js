import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export const indexRoutes = [
  {
    path: '/menu',
    component: () => import('../views/menu/menu'),
    name: '菜单管理'
  },
  {
    path: '/role',
    component: () => import('../views/role/role'),
    name: '角色管理'
  },
  {
    path: '/user',
    component: () => import('../views/user/user'),
    name: '管理员管理'
  },
  {
    path: '/cate',
    component: () => import('../views/cate/cate'),
    name: '商品分类'
  },
  {
    path: '/specs',
    component: () => import('../views/specs/specs'),
    name: '商品规格管理'
  },
  {
    path: '/member',
    component: () => import('../views/member/member'),
    name: '会员列表'
  },
  {
    path: '/banner',
    component: () => import('../views/banner/banner'),
    name: '轮播图列表'
  },
  {
    path: '/seck',
    component: () => import('../views/seck/seck'),
    name: '活动列表'
  },
  {
    path: '/goods',
    component: () => import('../views/goods/goods'),
    name: '商品管理'
  },
]

const router =  new Router({
  routes: [
    {
      path:'/login',
      component:()=>import ('../pages/login')
    },
    {
      path:'/index',
      component:()=>import('../pages'),
      children:[
        {
          path: '/home',
          component: () => import('../views/home')
        },
        ...indexRoutes,
        {
          path:'',
          redirect:'/menu'
        }
      ]
    },
    {
      path:'*',
      redirect:'/login'
    }
  ]
})

//全局导航守卫
router.beforeEach((to,from,next)=>{
  //是去登录就放行
  if(to.path=='/login'){
    next()
    return
  }
  //如果登录成功即本地存储有值就放行
  if(sessionStorage.getItem('userInfo')){
    next()
    return
  }
  //其他都强制去登录页面
  next('/login')
})

export default router
