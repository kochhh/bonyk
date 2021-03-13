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
    }
  },
  actions: {
    async createSession({ dispatch, commit }, timestart) {
      try {
        const uid = await dispatch('getUserId')
        const name = (await firebase.database().ref(`/users/${uid}/info`).once('value')).val().name
        const key = (await firebase.database().ref(`/sessions/active`).push({ timestart, name })).key
        const info = (await firebase.database().ref(`/sessions/active/${key}`).once('value')).val()
        commit('setSession', { ...info, id: key })
        return { ...info, id: key }
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
    async finalizeSession({ commit }, { activeSid, timeend }) {
      try {
        const session = (await firebase.database().ref(`/sessions/active/${activeSid}`).once('value')).val() || {}
        await firebase.database().ref(`/sessions/history`).push({ ...session, timeend })
        await firebase.database().ref(`/sessions/active/${activeSid}`).remove()
        commit('clearSession')
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async resumeSession({ commit }, sid) {
      try {
        const session = (await firebase.database().ref(`/sessions/history/${sid}`).once('value')).val() || {}
        await firebase.database().ref(`/sessions/active`).push(session)
        await firebase.database().ref(`/sessions/history/${sid}`).remove()
        commit('setSession')
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async addOrder({ commit }, { activeSid, id, category, label, price, count, time, byCard }) {
      try {
        await firebase.database().ref(`/sessions/active/${activeSid}/orders`).push({ id, category, label, price, count, time, byCard })
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
    session: s => s.session
  }
}
