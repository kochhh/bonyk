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
      path: '/category/:catId',
      name: 'Category',
      meta: {
        layout: 'main',
        requiresAuth: true
      },
      component: () => import('@/views/Category.vue'),
      props: true
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
      path: '/session/:id',
      name: 'Session',
      meta: {
        layout: 'main',
        requiresAuth: true
      },
      component: () => import('@/views/Session.vue')
    }
  ]
})

router.beforeEach((to, from, next) => {
  const loggedIn = firebase.auth().currentUser
  const requireAuth = to.matched.some(record => record.meta.requiresAuth)

  if (!loggedIn && requireAuth) {
    next('/login?message=nologin')
  } else {
    next()
  }
})

export default router
