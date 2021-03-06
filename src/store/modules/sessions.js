import Vue from 'vue'
import firebase from 'firebase/app'

export default {
  state: {
    session: {}
  },
  mutations: {
    setSession(state, session) {
      state.session = session
    },
    clearSession(state) {
      state.session = {}
    },
    addOrder(state, { key, order }) {
      Vue.set(state.session.orders, key, order)
    },
    removeOrder(state, id) {
      Vue.delete(state.session.orders, id)
    }
  },
  actions: {
    async createSession({ dispatch, commit }, { timestart, event }) {
      try {
        const exists = (await firebase.database().ref(`/sessions/active`).once('value')).exists()
        if (exists) return

        const uid = await dispatch('getUserId')
        const name = (await firebase.database().ref(`/users/${uid}/info`).once('value')).val().name
        const key = (await firebase.database().ref(`/sessions/active`).push({ timestart, event, name, uid })).key
        const info = (await firebase.database().ref(`/sessions/active/${key}`).once('value')).val() || {}
        commit('setSession', { ...info, id: key, orders: {} })
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async getActiveSession({ commit }) {
      try {
        const session = (await firebase.database().ref(`/sessions/active`).once('value')).val()
        if (!session) return

        const info = Object.keys(session).map(key => ({ ...session[key], id: key }))[0]
        if (!info.hasOwnProperty('orders')) {
          info.orders = {}
        }
        commit('setSession', info)
        return info
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async resumeSession({ commit }, sid) {
      try {
        const exists = (await firebase.database().ref(`/sessions/active`).once('value')).exists()
        if (exists) return

        const session = (await firebase.database().ref(`/sessions/history/${sid}`).once('value')).val() || {}
        const key = (await firebase.database().ref(`/sessions/active`).push(session)).key
        await firebase.database().ref(`/sessions/active/${key}/timeend`).remove()
        const info = (await firebase.database().ref(`/sessions/active/${key}`).once('value')).val() || {}
        await firebase.database().ref(`/sessions/history/${sid}`).remove()
        commit('setSession', { ...info, id: key })
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async finalizeSession({ commit }, { sid, timeend }) {
      try {
        const session = (await firebase.database().ref(`/sessions/active/${sid}`).once('value')).val() || {}
        await firebase.database().ref(`/sessions/history`).push({ ...session, timeend })
        await firebase.database().ref(`/sessions/active/${sid}`).remove()
        commit('clearSession')
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async addOrder({ commit }, { sid, id, category, label, price, count, time, byCard, isCustom }) {
      try {
        const options = { id, category, label, price, count, time, byCard, isCustom }
        const key = (await firebase.database().ref(`/sessions/active/${sid}/orders`).push(options)).key
        const order = (await firebase.database().ref(`/sessions/active/${sid}/orders/${key}`).once('value')).val()
        commit('addOrder', { key, order })
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async removeOrder({ commit }, { sid, id }) {
      try {
        await firebase.database().ref(`/sessions/active/${sid}/orders`).child(id).remove()
        commit('removeOrder', id)
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async editOrder({ commit }, { sid, id, count, price, byCard }) {
      try {
        await firebase.database().ref(`/sessions/active/${sid}/orders`).child(id).update({ count, price, byCard })
        const order = (await firebase.database().ref(`/sessions/active/${sid}/orders`).child(id).once('value')).val()
        const key = id
        commit('addOrder', { key, order })
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async fetchSessions({ commit }) {
      try {
        const list = (await firebase.database().ref(`/sessions/history`).once('value')).val() || {}
        return Object.keys(list).map(key => ({ ...list[key], id: key }))
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async fetchSessionById({ commit }, { id, isActive = false }) {
      try {
        const where = isActive ? 'active' : 'history'
        return (await firebase.database().ref(`/sessions/${where}/${id}`).once('value')).val() || {}
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async fetchOrders({ commit }, { id, isActive = false }) {
      try {
        const where = isActive ? 'active' : 'history'
        const orders = (await firebase.database().ref(`/sessions/${where}/${id}/orders`).once('value')).val() || {}
        return Object.keys(orders).map(key => ({ ...orders[key], id: key }))
      } catch (e) {
        commit('setError', e)
        throw e
      }
    }
  },
  getters: {
    session: s => s.session
  }
}
