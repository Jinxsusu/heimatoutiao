import Vue from 'vue'
import App from './App.vue'
import router from './permission'
import Component from './components/index.js'// 引入自定义组件
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './style/index.less'
import axios from './utils/axios.config'

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(Component)
Vue.use(axios)
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
