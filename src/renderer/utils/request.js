import axios from 'axios'
// 调用的是python 的服务
axios.default.withCredentials = true
const service = axios.create({
  baseURL: 'http://127.0.0.1:8000/',
  withCredentials: true,
  timeout: 25000
})

// request interceptor
service.interceptors.request.use(
  config => {
    // do something before request is sent
    // 如果是get请求 参数增加时间戳，否则ie可能会不走服务器从缓存拿数据
    if (config.method.toLowerCase() === 'get') {
      const t = new Date().getTime()
      if (config.params) {
        config.params['t'] = t
      } else {
        if (config.url.indexOf('?') > -1) {
          config.url += `&t=${t}`
        } else {
          config.url += `?t=${t}`
        }
      }
    }
    return config
  },
  error => {
    console.log(error)
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  response => {
    const res = response.data
    return res
  },
  error => {
    // console.log('err' + error) // for debug
    return Promise.reject(error)
  }
)

// get请求
export const $getReq = (url, params) => {
  return service({
    url: url,
    method: 'get',
    params: params
  })
}

// post请求
export const $postReq = (url, data) => {
  return service({
    url: url,
    method: 'post',
    data: data
  })
}

export default service
