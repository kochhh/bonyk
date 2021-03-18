import firebase from 'firebase/app'

export default {
  actions: {
    getUserId() {
      const user = firebase.auth().currentUser
      return user ? user.uid : null
    },
    async login({ commit }, { email, password }) {
      try {
        await firebase.auth().signInWithEmailAndPassword(email, password)
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async logout({ commit }) {
      await firebase.auth().signOut()
      commit('clearSession')
      commit('clearInfo')
    },
    async register({ dispatch, commit }, { email, password, name }) {
      try {
        await firebase.auth().createUserWithEmailAndPassword(email, password)
        const uid = await dispatch('getUserId')
        await firebase.database().ref(`/users/${uid}/info`).set({ name })
      } catch (e) {
        commit('setError', e)
        throw e
      }
    }
  }
}
