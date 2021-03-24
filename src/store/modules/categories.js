import firebase from 'firebase/app'

export default {
  actions: {
    async createCategory({ commit, dispatch }, { name, label, enabled }) {
      try {
        const order = (await dispatch('fetchCategories')).length || 0
        const newCategory = await firebase.database().ref(`/categories`).push({ name, label, enabled, order })
        return { name, label, enabled, order, id: newCategory.key }
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async removeCategory({ commit }, id) {
      try {
        await firebase.database().ref(`/categories`).child(id).remove()
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async fetchCategories({ commit }) {
      try {
        const categories = (await firebase.database().ref(`/categories`).once('value')).val() || {}
        return Object.keys(categories).map(key => ({ ...categories[key], id: key }))
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async updateCategories({ commit }, list) {
      try {
        for (const [index, item] of list.entries()) {
          await firebase.database().ref(`/categories`).child(item.id).update({
            order: index
          })
        }
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async createItem({ commit }, { catId, label, price, enabled, isCustom }) {
      try {
        const itemData = { label, price, enabled, isCustom }
        const key = (await firebase.database().ref(`/categories/${catId}`).child('items').push()).key
        const updates = {}

        updates[`/items/${key}`] = itemData
        await firebase.database().ref(`/categories/${catId}`).update(updates)
        return { label, price, enabled, isCustom, id: key }
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async fetchItems({ commit }, catId) {
      try {
        const items = (await firebase.database().ref(`/categories/${catId}/items`).once('value')).val() || {}
        const category = (await firebase.database().ref(`/categories/${catId}`).once('value')).val().label || ''
        return Object.keys(items).map(key => ({ ...items[key], id: key, category }))
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async updateEnabledItems({ commit }, { id, enabled, catId }) {
      try {
        await firebase.database().ref(`/categories/${catId}/items`).child(id).update({ enabled })
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async updateItem({ commit }, { id, label, price, catId }) {
      try {
        await firebase.database().ref(`/categories/${catId}/items`).child(id).update({ label, price })
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async removeItem({ commit }, { id, catId }) {
      try {
        await firebase.database().ref(`/categories/${catId}/items`).child(id).remove()
      } catch (e) {
        commit('setError', e)
        throw e
      }
    }
  }
}
