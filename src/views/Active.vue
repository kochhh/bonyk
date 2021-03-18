<template>
  <div>
    <h1 class="mb-6">Рабочая смена</h1>
    <div v-if="loading" class="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
      <app-loader />
    </div>
    <div v-else-if="!items">
      Заказов пока не было.
    </div>
    <div v-else>
      <session-table :items="items" :total-items="totalItems" />
      <t-pagination
        v-if="pageCount > pageSize"
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
  name: 'Active',
  metaInfo() {
    return {
      title: this.$title('Рабочая смена')
    }
  },
  components: {
    SessionTable
  },
  mixins: [
    paginationMixin
  ],
  data: () => ({
    loading: false,
    items: [],
    totalItems: []
  }),
  async mounted() {
    this.loading = true
    this.items = (await this.$store.dispatch('fetchOrders', {
        id: this.$store.getters.session.id,
        isActive: true
      }))
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
