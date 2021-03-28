import Vue from 'vue'
import VueRouter from 'vue-router'
import firebase from 'firebase/app'
import store from '../store'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/login',
      name: 'Login',
      meta: {
        layout: 'empty'
      },
      component: () => import('@/views/Login.vue')
    },
    {
      path: '/register',
      name: 'Register',
      meta: {
        layout: 'empty'
      },
      component: () => import('@/views/Register.vue')
    },
    {
      path: '/',
      name: 'Home',
      meta: {
        layout: 'main',
        requiresAuth: true
      },
      component: () => import('@/views/Home.vue')
    },
    {
      path: '/recent',
      name: 'Recent',
      meta: {
        layout: 'main',
        requiresAuth: true
      },
      component: () => import('@/views/Recent.vue')
    },
    {
      path: '/category/:cid',
      name: 'Category',
      meta: {
        layout: 'main',
        requiresAuth: true
      },
      component: () => import('@/views/Category.vue')
    },
    {
      path: '/edit',
      name: 'Edit',
      meta: {
        layout: 'main',
        requiresAuth: true
      },
      component: () => import('@/views/Edit.vue')
    },
    {
      path: '/history',
      name: 'History',
      meta: {
        layout: 'main',
        requiresAuth: true
      },
      component: () => import('@/views/History.vue')
    },
    {
      path: '/history/:id',
      name: 'Session',
      meta: {
        layout: 'main',
        requiresAuth: true
      },
      component: () => import('@/views/Session.vue')
    },
    {
      path: '/active',
      name: 'Active',
      meta: {
        layout: 'main',
        requiresAuth: true
      },
      component: () => import('@/views/Active.vue'),
      beforeEnter: (to, from, next) => {
        if (!Object.keys(store.getters.session).length > 0) next('/')
        else next()
      }
    },
    {
      path: '*',
      name: '404',
      meta: {
        layout: 'empty'
      },
      component: () => import('@/views/404.vue')
    }
  ]
})

router.beforeEach((to, from, next) => {
  const loggedIn = firebase.auth().currentUser
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)

  if (!loggedIn && requiresAuth) next('/login')
  else next()
})

export default router
