<template>
  <div>
    <h1 class="mb-6">История смен</h1>
    <app-loader v-if="loading" />
    <div v-else-if="!sessions">
      Здесь пока пусто.
    </div>
    <div v-else>
      <div class="w-full overflow-x-auto">
        <table class="min-w-full shadow-sm border border-gray-200 dark:border-gray-700 mb-4 text-sm">
          <thead>
            <tr>
              <th class="px-3 py-2 font-semibold text-left bg-gray-100 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 w-10">
                №
              </th>
              <th class="px-3 py-2 font-semibold text-left bg-gray-100 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 w-48">
                Открыта
              </th>
              <th class="px-3 py-2 font-semibold text-left bg-gray-100 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
                Мероприятие
              </th>
              <th class="px-3 py-2 font-semibold text-left bg-gray-100 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 w-32">
                Открыл
              </th>
              <th class="px-3 py-2 font-semibold text-left bg-gray-100 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 w-12">
              </th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
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
    this.sessions = (await this.$store.dispatch('fetchSessions'))
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
