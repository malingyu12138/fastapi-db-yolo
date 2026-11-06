import axios from 'axios'
import Cookies from 'js-cookie' 

const service=axios.create({
    baseURL:'/api',
    timeout:3000
})

service.interceptors.request.use(
    config=>{
        const token = Cookies.get('access_token')
        // 如果 token 存在，则注入 Authorization Header
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`
        }
        console.log('URL:',config.url)
        console.log('Headers:', config.headers)
        // 在发送请求之前做些什么
        return config
    },
    error=>{
        // 对请求错误做些什么
        return Promise.reject(error)
    }
)

service.interceptors.response.use(
    response=>{
        console.log("response data:",response.data)
        // 对响应数据做点什么
        return response 
    },
    error=>{
        // 对响应错误做点什么
        console.log('err:',error)
        return Promise.reject(error)
        
    }
    )

export default service