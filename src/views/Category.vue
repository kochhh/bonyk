<template>
  <div>
    <button-back />
    <app-loader v-if="loading" />
    <div v-else-if="!items" class="text-center">
      Такой категории не существует.<br>
      <router-link :to="'/edit'" class="link">
        Создать новую
      </router-link>
    </div>
    <div v-else-if="!items.length" class="text-center">
      Здесь пока пусто.<br>
      <router-link :to="'/edit'" class="link">
        Создайте новую позицию
      </router-link>
    </div>
    <div v-else class="flex flex-wrap justify-center -ml-2 -mt-2">
      <item-button v-for="item in items" :key="item.id" :item="item"></item-button>
    </div>
  </div>
</template>

<script>
import ItemButton from "@/components/ItemButton"
import ButtonBack from '@/components/ButtonBack'

export default {
  name: 'Category',
  metaInfo() {
    return {
      title: this.$title('Позиции')
    }
  },
  components: {
    ItemButton, ButtonBack
  },
  data: () => ({
    loading: true,
    cid: null,
    items: []
  }),
  async mounted() {
    try {
      this.cid = this.$route.params.cid
      this.items = await this.$store.dispatch('fetchItems', this.cid) || null
      this.loading = false
    } catch (e) {}
  }
}
</script>
