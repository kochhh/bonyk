<template>
  <div>
    <div class="list-none m-0 mb-6 p-0 flex text-xs">
      <router-link :to="'/history'" class="link inline-flex space-x-2">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-left" viewBox="0 0 16 16">
          <path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/>
        </svg>
        <span>История смен</span>
      </router-link>
    </div>
    <h1 class="mb-6">Заказы по смене</h1>
    <loader v-if="loading" />
    <div v-else-if="!items.length">
      Заказов в данной смене не было.
    </div>
    <div v-else>
      <session-table :items="items" :total-items="totalItems" />
      <t-pagination
        v-model="page"
        :total-items="pageCount"
        :per-page="pageSize"
        @change="pageChangeHandler"
        :limit="5"
      />
    </div>
  </div>
</template>

<script>
import paginationMixin from '@/mixins/pagination.mixin'
import SessionTable from '@/components/SessionTable'

export default {
  name: 'Session',
  metaInfo() {
    return {
      title: this.$title('Заказы по смене')
    }
  },
  components: {
    SessionTable
  },
  mixins: [
    paginationMixin
  ],
  data: () => ({
    loading: true,
    items: [],
    totalItems: []
  }),
  async mounted() {
    this.items = (await this.$store.dispatch('fetchOrders', this.$route.params.id))
      .map((el, index) => ({
        ...el,
        number: index + 1
      }))
    this.totalItems = this.items
    this.setupPagination(this.items)
    this.loading = false
  },
  watch: {
    $route(to) {
      if (!to.query.page) {
        this.page = 1
      }
    }
  }
}
</script>
