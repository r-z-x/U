import axios from 'axios'
import router from '../../router'
import { Toast } from "vant";

const http = axios.create({
    baseURL: '/api'
})

http.interceptors.request.use(req => {
    let token = sessionStorage.getItem("userInfo") ? JSON.parse(sessionStorage.getItem("userInfo")).token : ''
    req.headers.authorization = token
    return req
})

http.interceptors.response.use(res => {
    if (res.data.code == 500) {
        Toast.fail(res.data.msg)
        router.push('/login')
        return res
    } else if (res.data.code == 403) {
        Toast.fail(res.data.msg)
        router.push('/login')
        return res
    } else {
        return res
    }
})
export default http