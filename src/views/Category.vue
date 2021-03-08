<template>
  <div>
    <loader v-if="loading" />
    <div v-else class="flex flex-wrap justify-center -ml-1">
      <item-button v-for="item in items" :key="item.id" :item="item"></item-button>
    </div>
    <router-link to="/" class="fixed z-10 left-0 top-16 p-4 bottom-0 bg-gray-100 border border-gray-200 flex justify-center items-center font-semibold">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-left" viewBox="0 0 16 16">
        <path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/>
      </svg>
    </router-link>
  </div>
</template>

<script>
import ItemButton from "../components/ItemButton"

export default {
  name: 'Category',
  metaInfo() {
    return {
      title: this.$title('Позиции')
    }
  },
  components: {
    ItemButton
  },
  data: () => ({
    loading: true,
    catId: null,
    items: []
  }),
  async mounted() {
    this.catId = this.$route.params.catId
    this.items = await this.$store.dispatch('fetchItems', this.catId)
    this.loading = false
  }
}
</script>
