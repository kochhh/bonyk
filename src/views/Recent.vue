<template>
  <div>
    <app-loader v-if="loading" />
    <div v-else class="flex flex-wrap justify-center -ml-2 -mt-2">
      <item-button v-for="item in items" :key="item.id" :item="item"></item-button>
    </div>
  </div>
</template>

<script>
import ItemButton from "@/components/ItemButton"

export default {
  name: 'Recent',
  metaInfo() {
    return {
      title: 'Актуальное'
    }
  },
  components: {
    ItemButton
  },
  data: () => ({
    loading: true,
    items: []
  }),
  async mounted() {
    try {
      this.cid = '-MVY_0ZfRasKQSbxKZfY'
      this.items = await this.$store.dispatch('fetchItems', this.cid) || null
      // this.items = await this.$store.dispatch('fetchRecent')
      this.loading = false
    } catch (e) {}
  }
}
</script>
