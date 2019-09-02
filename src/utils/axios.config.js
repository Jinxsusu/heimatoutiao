import axios from 'axios'
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0'
// 数据响应拦截器
axios.interceptors.request.use(function (config) {
// 对响应数据做处理
  // 必须 return
  // 统一注入token
  let token = window.localStorage.getItem('user-token')
  config.headers['Authorization'] = `Bearer ${token}`
  return config
}, function () { })

export default {
  install: function (Vue) {
    Vue.prototype.$axios = axios// axios赋值给全局属性
  }
}
