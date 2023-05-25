import Vue from 'vue'
import Router from 'vue-router'
import Main from '@/components/Main'
import Login from '@/components/Login'
import Dashboard from '@/components/Dashboard'
import '../../flowbite.min.js'
Vue.use(Router)
// Vue.loadScript('../../flowbite.min.js')
export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/main',
      name: 'Main',
      component: Main
    },
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: Dashboard
    }
  ]
})
