import http from './axios'


//注册
export function getRegister(data) {
    return http.post('/api/register', data)
}

//登录
export function getLogin(data) {
    return http.post('/api/login', data)
}

//获取轮播图
export function getBanner() {
    return http.get('/api/getbanner')
}

//获取商品信息（热门、好货）
export function getIndexgoods() {
    return http.get('/api/getindexgoods')
}

//获取分类树形图
export function getCatetree() {
    return http.get('/api/getcatetree')
}

//获取商品列表
export function getGoods(params) {
    return http.get('/api/getgoods', { params })
}

//获取一个商品详情
export function getGoodsinfo(params) {
    return http.get('/api/getgoodsinfo', { params })
}


//购物车添加
export function getCartadd(data) {
    return http.post('/api/cartadd', data)
}

//购物车列表
export function getCartlist(params) {
    return http.get('/api/cartlist', { params })
}

//购物车删除
export function getCartdelete(data) {
    return http.post('/api/cartdelete', data)
}