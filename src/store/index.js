import Vue from 'vue'
import Vuex from 'vuex'
import auth from './modules/auth'
import info from './modules/info'
import categories from './modules/categories'
import sessions from './modules/sessions'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    error: null
  },
  mutations: {
    setError(state, error) {
      state.error = error
    },
    clearError(state) {
      state.error = null
    }
  },
  getters: {
    error: s => s.error
  },
  modules: {
    auth, info, categories, sessions
  }
})
