import axios from 'axios'
import router from '../permission'
import { Message } from 'element-ui'
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0'
// 请求拦截器
axios.interceptors.request.use(function (config) {
  // 对响应数据做处理
  // 必须 return
  // 统一注入token
  let token = window.localStorage.getItem('user-token')
  config.headers['Authorization'] = `Bearer ${token}`
  return config
}, function () { })
axios.interceptors.response.use(function (response) {
  return response.data ? response.data : {}
}, function (err) {
  let status = err.response.status
  let message = ''
  switch (status) {
    case 400:
      message = '请求参数错误'
      break
    case 403:
      message = '用户非实名认证用户,无权限登录'
      break
    case 507:
      message = '服务器或者数据异常'
      break
    case 404:
      message = '手机号不正确'
      break
    case 401:
      window.localStorage.clear()
      router.push('/login')
      break
    default:
      message = '未知错误'
      break
  }
  Message({ type: 'warning', message })
  return new Promise(function () {})
})
export default {
  install: function (Vue) {
    Vue.prototype.$axios = axios// axios赋值给全局属性
  }
}
