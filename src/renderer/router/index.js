import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'landing-page',
      component: require('@/views/LoginView')
    },
    {
      path: '/dashborad/:user',
      name: 'dashborad',
      component: require('@/views/DashboradView')
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
