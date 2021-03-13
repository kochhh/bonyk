import firebase from 'firebase/app'

export default {
  state: {
    categories: []
  },
  mutations: {
    addCategory(state, category) {
      state.categories.push(category)
    }
  },
  actions: {
    async createCategory({ commit }, { name, label, enabled }) {
      try {
        // const exists = (await firebase.database().ref(`/categories`).orderByChild('name').equalTo(name).once('value')).exists()
        // if (exists) {
        //   console.log('exists')
        //   return
        // }
        const newCategory = await firebase.database().ref(`/categories`).push({ name, label, enabled })
        const category = { name, label, enabled, id: newCategory.key }
        // commit('addCategory', category)
        return category
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
    async updateCategories({ commit }, sorted) {
      try {
        const categories = await firebase.database().ref(`/categories`).set(sorted)
        console.log(categories)
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
    async createItem({ commit }, { catId, label, price, enabled }) {
      try {
        const itemData = { label, price, enabled }
        const item = await firebase.database().ref(`/categories/${catId}`).child('items').push()
        const key = item.key
        const updates = {}

        updates[`/items/${key}`] = itemData
        await firebase.database().ref(`/categories/${catId}`).update(updates)
        return { label, price, enabled, id: key }
      } catch (e) {
        commit('setError', e)
        throw e
      }
    },
    async fetchItems({ commit }, catId) {
      try {
        const items = (await firebase.database().ref(`/categories/${catId}/items`).once('value')).val() || {}
        const category = (await firebase.database().ref(`/categories/${catId}`).once('value')).val().label || ''
        return Object.keys(items).map(key => ({...items[key], id: key, category}))
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
  },
  getters: {
    categories: s => s.categories
  }
}
