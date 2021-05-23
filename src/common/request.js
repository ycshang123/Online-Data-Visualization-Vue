/*
 * @Description:
 * @Author: xunmi
 * @Version: 1.0
 * @Date: 2021-04-07 22:02:13
 */
import axios from "axios"


/**
 * 创建一个 axios 的对象创建一个 axios 的对象
 */
const instance = axios.create({
    // BASURL 会在发送请求的时候拼接在url参数前面
    baseURL: "http://127.0.0.1:5000",
    // baseURL: "http://112.126.61.191:5000",
    responseType: 'json',
    headers: {
        'Content-Type': 'application/json;',
    }
})

/**
 * 请求拦截
 * 所有的网络请求都会先走这个方法，我们可以在他里面为请求添加一些自定义的内容
 */
instance.interceptors.request.use(
    config => {
        // 添加请求头
        // config.headers.token = '123456'
        return config
    },
    err => {
        return Promise.reject(err)
    }
)

/**
 * 响应拦截
 * 所有的网络请求返回数据之后都会先执行此方法
 * 此处可以根据服务器返回的状态码做相应的处理
 */
instance.interceptors.response.use(
    response => {
        // 预处理相应数据
        return response.data
    },
    err => {
        const { response } = err
        if (response) {
            // 服务器返回了结果
            switch (response.status) {
                case 401:
                    break
                // 服务器拒绝执行，一般是 token 或 session 过期了
                case 403:
                    break
                case 404:
                    break
            }
        } else {
            // 服务器连结果都没有返回
            if (!window.navigator.onLine) {
                // 客户端断网了，将页面跳转到一个断网页面，也可以结合路由进行使用
                return
            }
        }
        return Promise.reject(err)
    }
)

export async function get (url, params) {
    return await instance.get(url, params)
}

export async function post (url, params) {
    return await instance.post(url, params)
}

export async function put (url, params) {
    return await instance.put(url, params)
}


