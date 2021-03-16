<template>
  <div>
    <button
      type="button"
      class="btn w-full bg-gray-100 border-gray-300 rounded-sm shadow-none mb-4 md:mb-6 p-2 space-x-2 flex justify-center items-center text-sm md:text-base font-semibold"
      @click="$router.go(-1)"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
        <path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/>
      </svg>
      <span>Назад</span>
    </button>
    <div v-if="loading" class="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
      <app-loader />
    </div>
    <div v-else-if="!items.length" class="text-center">
      Здесь пока пусто.<br>
      <router-link :to="'/edit'" class="link">
        Создайте новую позицию
      </router-link>
    </div>
    <div v-else class="flex flex-wrap justify-center -ml-0.5 md:-ml-1">
      <item-button v-for="item in items" :key="item.id" :item="item"></item-button>
    </div>
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
