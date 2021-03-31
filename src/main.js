import Vue from 'vue'
import VueTailwind from 'vue-tailwind'
import Vuelidate from 'vuelidate'
import VueMeta from 'vue-meta'
import VueToast from 'vue-toast-notification'
import JsonExcel from 'vue-json-excel'

import App from './App.vue'
import router from './router'
import store from './store'
import AppLoader from './components/app/Loader'
import dateFilter from './filters/date.filter'
import currencyFilter from './filters/currency.filter'
import settings from './utils/components'
import titlePlugin from './utils/title.plugin'
import './registerServiceWorker'

import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

import './assets/tailwind.css'
import 'vue-toast-notification/dist/theme-sugar.css'
import './assets/styles.css'

Vue.config.productionTip = false

Vue.use(VueTailwind, settings)
Vue.use(Vuelidate)
Vue.use(VueMeta)
Vue.use(VueToast)
Vue.use(titlePlugin)
Vue.filter('date', dateFilter)
Vue.filter('currency', currencyFilter)
Vue.component('AppLoader', AppLoader)
Vue.component('downloadExcel', JsonExcel)

const fbOptions = {
  apiKey: "AIzaSyDXQmYKZKHM2RTj5yoR0EsBVdRWe3G5rSE",
  authDomain: "bonyk-crm.firebaseapp.com",
  projectId: "bonyk-crm",
  storageBucket: "bonyk-crm.appspot.com",
  messagingSenderId: "32192854639",
  appId: "1:32192854639:web:7d736b6c9d5e8fc82d2b9a",
  measurementId: "G-NQRQKRCLZ8"
}

if (process.env.NODE_ENV === "production") {
  firebase.initializeApp({
    databaseURL: "https://bonyk-work.firebaseio.com",
    ...fbOptions
  })
} else {
  firebase.initializeApp(fbOptions)
}

let app

firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app')
  }
})
