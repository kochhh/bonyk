<template>
  <div>
    <div v-if="loading" class="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
      <loader />
    </div>
    <div v-else>
      <div class="flex flex-wrap justify-center -m-1">
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
    const categories = await this.$store.dispatch('fetchCategories')
    this.categories = categories.filter(el => el.items)
    this.loading = false

    this.$toast.clear()
    if (messages[this.$route.query.message]) {
      this.$toast.success(messages[this.$route.query.message])
    }
  }
}
</script>
