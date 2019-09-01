import Vue from 'vue'
import App from './App.vue'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './style/index.less'
import axios from 'axios'
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0'
Vue.prototype.$axios = axios // 给Vue对象的原型属性赋值

Vue.config.productionTip = false
Vue.use(ElementUI)
new Vue({
  router,
  render: h => h(App)
  // eslint-disable-next-line eol-last
}).$mount('#app')