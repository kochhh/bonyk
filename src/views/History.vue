<template>
  <div>
    <h1 class="mb-6">История смен</h1>
    <app-loader v-if="loading" />
    <div v-else-if="!sessions">
      Здесь пока пусто.
    </div>
    <div v-else>
      <div class="w-full overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-100 shadow-sm border border-gray-200 mb-6 text-sm">
          <thead>
            <tr>
              <th class="px-3 py-2 font-semibold text-left bg-gray-100 border-b w-10">
                №
              </th>
              <th class="px-3 py-2 font-semibold text-left bg-gray-100 border-b w-48">
                Открыта
              </th>
              <th class="px-3 py-2 font-semibold text-left bg-gray-100 border-b w-48">
                Закрыта
              </th>
              <th class="px-3 py-2 font-semibold text-left bg-gray-100 border-b w-28">
                Открыл
              </th>
              <th class="px-3 py-2 font-semibold text-left bg-gray-100 border-b">
                Действия
              </th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-100">
            <history-row v-for="item in items" :key="item.id" :item="item" />
          </tbody>
        </table>
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
import HistoryRow from '@/components/HistoryRow'

export default {
  name: 'History',
  metaInfo() {
    return {
      title: this.$title('История смен')
    }
  },
  components: {
    HistoryRow
  },
  mixins: [
    paginationMixin
  ],
  data: () => ({
    loading: true,
    sessions: []
  }),
  async mounted() {
    this.sessions = (await this.$store.dispatch('fetchSessionsList'))
      .reverse()
      .map((el, index) => ({
        ...el,
        number: index + 1
      }))
    this.setupPagination(this.sessions)
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
