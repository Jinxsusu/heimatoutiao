import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/home/home.vue'
// views一般来说是放置路由级组件,就是直接挂到路由表上的components的组件,
// 相当于我们原来的一个个页面
import Login from './views/login/index.vue'
import Main from './views/home/main.vue'

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/login',
    component: Login
  },
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'home',
    component: Home,
    children: [{
      path: '',
      component: Main
    }]
  }, {
    path: '',
    component: () => import('./views/comment/index.vue')// 设置为按需加载
  }
    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (about.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    // }
  ]
})
