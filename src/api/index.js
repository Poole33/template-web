import axios from "axios"
// import qs from 'qs'
import { message } from 'ant-design-vue'
import router from "@/router"
import { throttle } from 'lodash'
const go_login = throttle(goLogin, 5000, { trailing: false })
const show_error_msg = throttle(showErrorMsg, 5000, { trailing: false })

const service = axios.create({
    timeout: 5000,
    baseURL: import.meta.env.VITE_APP_BASE_API
})

// 请求拦截
service.interceptors.request.use(res => {
    // if (res.method == 'post') res.data = qs.stringify(res.data);
    res.headers.Authorization = localStorage.getItem('token')
    return res
})

// 响应拦截
service.interceptors.response.use(res => {
    // console.log('code', res.data.code);
    if (res.data.code == 200) return res.data
    else {
        show_error_msg(res.data.msg)
        if (res.data.code == 404) router.replace({ path: '/404' })
        else if (res.data.code == 401) {
            go_login()
            localStorage.removeItem('token')
            
        }
        return res.data
    }
})

export default {
    get: (url, params) => {
        return service.get(url, { params })
    },
    post: (url, data) => {
        return service.post(url, data, {
            headers: { 'Content-Type': 'application/json' }
        })
    },
    upload: (url, data) => {
        const formData = new FormData()
            Object.keys(data).forEach((key) => {
            formData.append(key, data[key])
        })
        return service.post(url, formData, { header: { 'Content-Type': 'multipart/form-data' } })
    },
    put: () => {},
}

function goLogin() {
    // console.log('goLogin');
    router.push({
        path: '/login',
        query: {
            redirect: location.pathname + location.search
        }
    })
}

function showErrorMsg(msg) {
    message.error(msg)
}