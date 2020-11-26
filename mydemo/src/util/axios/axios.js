//引入axios
import axios from 'axios'

import router from "../../router"

//重新创建一个axios的实例
const http = axios.create({
    baseURL:'/api'
})

//请求拦截
http.interceptors.request.use(req=>{
    //登录成功之后得到token,并从离线存储中取出来赋值给authorization,authorization是后端定义的token名称.
    let userInfo = sessionStorage.getItem('userInfo') ? JSON.parse(sessionStorage.getItem('userInfo')) : {};

    req.headers.authorization = userInfo.token;
    //返回所有的请求信息
    return req;
})
//响应拦截
http.interceptors.response.use(res=>{
    //全局拦截错误
    if(res.data.code==403){
        alert(res.data.msg);

        router.push("/login");
        return res;
    }else if(res.data.code == 500){
        alert(res.data.msg);
        return res;
    }else{
        return res
    }
})
//导出新创建的实例
export default http