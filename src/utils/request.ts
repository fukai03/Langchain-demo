// 请求函数封装
import axios from 'axios'

const service = axios.create({
    baseURL: '/',
    timeout: 50000
})

// 请求拦截器
service.interceptors.request.use(
    config => {
        return config
    }
)

// 响应拦截器
service.interceptors.response.use(
    response => {
        return response
    }
)

export default service