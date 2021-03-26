<template>
  <div>
    <button-back />
    <h1 class="mb-6">Заказы по смене</h1>
    <app-loader v-if="loading" />
    <div v-else-if="!items">
      Заказов в данной смене не было.
    </div>
    <div v-else>
      <div class="w-full overflow-x-auto">
        <session-table :items="items" :total-items="totalItems" />
      </div>
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
import ButtonBack from '@/components/ButtonBack'

export default {
  name: 'Session',
  metaInfo() {
    return {
      title: this.$title('Заказы по смене')
    }
  },
  components: {
    SessionTable, ButtonBack
  },
  mixins: [
    paginationMixin
  ],
  data: () => ({
    loading: false,
    items: [],
    totalItems: []
  }),
  watch: {
    $route(to) {
      if (!to.query.page) {
        this.page = 1
      }
    }
  },
  async mounted() {
    this.loading = true
    this.items = (await this.$store.dispatch('fetchOrders', {
        id: this.$route.params.id
      }))
      .reverse()
      .map((el, index) => ({
        ...el,
        number: index + 1
      }))
    this.totalItems = this.items
    this.setupPagination(this.items)
    this.loading = false
  }
}
</script>
