<template>
  <div>
    <button
      type="button"
      class="btn w-full bg-gray-100 border-gray-300 rounded-sm shadow-none mb-4 md:mb-6 p-2 space-x-2 flex justify-center items-center font-semibold text-sm md:text-base"
      @click="$router.go(-1)"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
        <path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/>
      </svg>
      <span>Назад</span>
    </button>
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
    loading: false,
    items: [],
    totalItems: []
  }),
  async mounted() {
    this.loading = true
    this.items = (await this.$store.dispatch('fetchOrders', {
        id: this.$route.params.id
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
