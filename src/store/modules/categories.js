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
    async createItem({ commit }, { cid, label, price, enabled, isCustom }) {
      try {
        const itemData = { label, price, enabled, isCustom }
        const key = (await firebase.database().ref(`/categories/${cid}`).child('items').push()).key
        const updates = {}

        updates[`/items/${key}`] = itemData
        await firebase.database().ref(`/categories/${cid}`).update(updates)
        return { label, price, enabled, isCustom, id: key }
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async fetchItems({ commit }, cid) {
      try {
        const items = (await firebase.database().ref(`/categories/${cid}/items`).once('value')).val() || {}
        const category = (await firebase.database().ref(`/categories/${cid}`).once('value')).val() || ''
        if (!category) return

        return Object.keys(items).map(key => ({
          ...items[key],
          id: key,
          category: category.label
        }))
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async updateEnabledItems({ commit }, { id, enabled, cid }) {
      try {
        await firebase.database().ref(`/categories/${cid}/items`).child(id).update({ enabled })
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async updateItem({ commit }, { id, label, price, cid }) {
      try {
        await firebase.database().ref(`/categories/${cid}/items`).child(id).update({ label, price })
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async removeItem({ commit }, { id, cid }) {
      try {
        await firebase.database().ref(`/categories/${cid}/items`).child(id).remove()
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async fetchRecent({ commit }) {
      try {
      } catch (e) {
        commit('setError', e)
        throw e
      }
    }
  }
}
