<template>
  <div>
    <h1 class="mb-6">Рабочая смена</h1>
    <div class="mb-6 text-xs">
      <p class="mb-1 text-xs">
        <span class="text-gray-500 dark:text-gray-400">Открыта:</span> <strong class="font-semibold">{{ session.name }}</strong>
      </p>
      <p class="mb-1 text-xs">
        <span class="text-gray-500 dark:text-gray-400">Мероприятие:</span> <strong class="font-semibold">{{ session.event }}</strong>
      </p>
    </div>
    <app-loader v-if="loading" />
    <div v-else-if="!items">
      Заказов пока не было.
    </div>
    <div v-else>
      <div class="w-full overflow-x-auto">
        <session-table :items="items" :total-items="totalItems" @removed="removeOrder" @edited="editOrder" />
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
    loading: true,
    items: [],
    totalItems: []
  }),
  computed: {
    session() {
      return this.$store.getters.session
    }
  },
  methods: {
    removeOrder(id) {
      this.items = this.items.filter(el => el.id !== id)
      this.totalItems = this.items
    },
    editOrder(id, updates) {
      this.items.map(item => {
        if (item.id === id) {
          item.byCard = updates.byCard
          item.count = updates.count
          item.price = updates.price
        }
        return item
      })
    }
  },
  watch: {
    $route(to) {
      if (!to.query.page) {
        this.page = 1
      }
    }
  },
  async mounted() {
    this.items = (await this.$store.dispatch('fetchOrders', {
        id: this.session.id,
        isActive: true
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
