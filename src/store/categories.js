import firebase from 'firebase/app'

export default {
  actions: {
    async createCategory({ commit }, { name, label, enabled }) {
      try {
        // const exists = (await firebase.database().ref(`/categories`).orderByChild('name').equalTo(name).once('value')).exists()

        // if (exists) {
        //   console.log('exists')
        //   return
        // }

        const category = await firebase.database().ref(`/categories`).push({ name, label, enabled })
        return { name, label, enabled, id: category.key }
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async fetchCategories({ commit }) {
      try {
        const categories = (await firebase.database().ref(`/categories`).once('value')).val() || {}
        return Object.keys(categories).map(key => ({...categories[key], id: key}))
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    // async updateCategories({ commit, dispatch }, {}) {
    // },
    async createItem({ commit }, { catId, label, price, enabled }) {
      try {
        const itemData = { label, price, enabled }
        const item = await firebase.database().ref(`/categories/${catId}`).child('items').push()
        const newItemKey = item.key
        const updates = {}

        updates[`/items/${newItemKey}`] = itemData
        await firebase.database().ref(`/categories/${catId}`).update(updates)
        return { label, price, enabled, id: newItemKey }
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async fetchItems({ commit }, catId) {
      try {
        const items = (await firebase.database().ref(`/categories/${catId}/items`).once('value')).val() || {}
        return Object.keys(items).map(key => ({...items[key], id: key}))
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async updateEnabledItems({ commit }, { id, enabled, catId }) {
      try {
        const item = await firebase.database().ref(`/categories/${catId}/items`).child(id)
        item.update({ enabled })
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async updateItem({ commit }, { id, label, price, catId }) {
      try {
        const item = await firebase.database().ref(`/categories/${catId}/items`).child(id)
        item.update({ label, price })
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async deleteItem({ commit }, { id, catId }) {
      try {
        const item = await firebase.database().ref(`/categories/${catId}/items`).child(id)
        item.remove()
        return { id: item.key }
      } catch (e) {
        commit('setError', e)
        throw e
      }
    }
  }
}
