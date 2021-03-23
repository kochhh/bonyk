import Vue from 'vue'
import VueRouter from 'vue-router'
import firebase from 'firebase/app'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: () => import('@/views/Login.vue')
    },
    {
      path: '/register',
      name: 'Register',
      component: () => import('@/views/Register.vue')
    },
    {
      path: '/',
      name: 'Home',
      meta: {
        requiresAuth: true
      },
      component: () => import('@/views/Home.vue')
    },
    {
      path: '/category/:catId',
      name: 'Category',
      meta: {
        requiresAuth: true
      },
      component: () => import('@/views/Category.vue')
    },
    {
      path: '/edit',
      name: 'Edit',
      meta: {
        requiresAuth: true
      },
      component: () => import('@/views/Edit.vue')
    },
    {
      path: '/history',
      name: 'History',
      meta: {
        requiresAuth: true
      },
      component: () => import('@/views/History.vue')
    },
    {
      path: '/history/:id',
      name: 'Session',
      meta: {
        requiresAuth: true
      },
      component: () => import('@/views/Session.vue')
    },
    {
      path: '/active',
      name: 'Active',
      meta: {
        requiresAuth: true
      },
      component: () => import('@/views/Active.vue')
    },
  ]
})

router.beforeEach((to, from, next) => {
  const loggedIn = firebase.auth().currentUser
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)

  if (!loggedIn && requiresAuth) {
    next('/login')
  } else {
    next()
  }
})

export default router
