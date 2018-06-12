import Vue from 'vue'
import Router from 'vue-router'
import firebase from 'firebase'

import sign from '@/components/sign/sign'
import home from '@/components/home/home'

Vue.use(Router)

let router =  new Router({
  routes: [
    {
      path: '*',
      redirect: '/'
    },
    {
      path: '/',
      name: 'sign',
      component: sign
    },
    {
      path: '/home',
      name: 'home',
      component: home,
      meta: {
        requiresAuth: true
      }
    },
  ]
})

router.beforeEach((to, from, next) => {
  let currentUser = firebase.auth().currentUser;
  let requiresAuth = to.matched.some(record => record.meta.requiresAuth);

  if (requiresAuth && !currentUser) next('sign')
  else if (!requiresAuth && currentUser) next('home')
  else next()
})

export default router
