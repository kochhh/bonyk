import firebase from 'firebase/app'

export default {
  state: {
    session: {},
    orders: []
  },
  mutations: {
    setSession(state, session) {
      state.session = session
    },
    addOrder(state, order) {
      state.orders.push(order)
    },
    clearSession(state) {
      state.session = {}
      state.orders = []
    }
  },
  actions: {
    async createSession({ dispatch, commit }, timestart) {
      try {
        const uid = await dispatch('getUserId')
        const name = (await firebase.database().ref(`/users/${uid}/info`).once('value')).val().name
        const key = (await firebase.database().ref(`/sessions/active`).push({ timestart, name })).key
        const info = (await firebase.database().ref(`/sessions/active/${key}`).once('value')).val() || {}
        commit('setSession', { ...info, id: key })
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async getActiveSession({ commit }) {
      try {
        const sessions = (await firebase.database().ref(`/sessions/active`).once('value')).val()
        if (sessions) {
          const info = Object.keys(sessions).map(key => ({...sessions[key], id: key}))[0]
          commit('setSession', info)
        }
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async resumeSession({ commit }, sid) {
      try {
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
    async addOrder({ commit }, { sid, id, category, label, price, count, time, byCard }) {
      try {
        const options = { id, category, label, price, count, time, byCard }
        const key = (await firebase.database().ref(`/sessions/active/${sid}/orders`).push(options)).key
        const order = (await firebase.database().ref(`/sessions/active/${sid}/orders/${key}`).once('value')).val()
        commit('addOrder', order)
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async fetchSessionsList({ commit }) {
      try {
        const list = (await firebase.database().ref(`/sessions/history`).once('value')).val() || {}
        return Object.keys(list).map(key => ({...list[key], id: key}))
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async fetchOrders({ commit }, id) {
      try {
        const orders = (await firebase.database().ref(`/sessions/history/${id}/orders`).once('value')).val() || {}
        return Object.keys(orders).map(key => ({...orders[key], id: key}))
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
  },
  getters: {
    session: s => s.session,
    orders: s => s.orders
  }
}
