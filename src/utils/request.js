import axios from 'axios'
const request = axios.create({
  baseURL: 'http://liufusong.top:8080/',
  timeout: 5000
})
// 添加请求拦截器，在请求头中加token,Cookie
request.interceptors.request.use(
  config => {
    config.headers.Authorization = localStorage.getItem('token')
    return config
  }, error => {
    return Promise.reject(error)
  })

export default request
