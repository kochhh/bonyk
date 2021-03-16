<template>
  <div>
    <div v-if="loading" class="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
      <app-loader />
    </div>
    <div v-else-if="!categories.length" class="text-center">
      Здесь пока пусто.<br>
      <router-link :to="'/edit'" class="link">Добавьте категорию</router-link>
    </div>
    <div v-else>
      <div class="flex flex-wrap justify-center -ml-0.5 md:-ml-1">
        <category-button v-for="category in categories" :key="category.id" :category="category" />
      </div>
    </div>
  </div>
</template>

<script>
import CategoryButton from '@/components/CategoryButton'
import messages from '@/utils/messages'

export default {
  name: 'Home',
  metaInfo() {
    return {
      title: 'Bonyk System'
    }
  },
  components: {
    CategoryButton
  },
  data: () => ({
    loading: true,
    categories: []
  }),
  async mounted() {
    try {
      this.categories = await this.$store.dispatch('fetchCategories')
      // this.categories = this.categories.filter(el => el.items)
      this.loading = false
    } catch (e) {}

    if (messages[this.$route.query.message]) {
      this.$toast.success(messages[this.$route.query.message])
    }
  }
}
</script>
