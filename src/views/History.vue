<template>
  <div>
    <h1 class="mb-6">История смен</h1>
    <loader v-if="loading" />
    <table v-else class="min-w-full divide-y divide-gray-100 shadow-sm border border-gray-200 mb-8 text-sm">
      <thead>
        <tr>
          <th class="px-3 py-2 font-semibold text-left bg-gray-100 border-b w-12">
            №
          </th>
          <th class="px-3 py-2 font-semibold text-left bg-gray-100 border-b w-40">
            Дата открытия
          </th>
          <th class="px-3 py-2 font-semibold text-left bg-gray-100 border-b">
            Время открытия
          </th>
          <th class="px-3 py-2 font-semibold text-left bg-gray-100 border-b w-40">
            Открыл
          </th>
          <!-- <th class="px-3 py-2 font-semibold text-left bg-gray-100 border-b w-20">
            Resume
          </th> -->
        </tr>
      </thead>
      <tbody class="divide-y divide-gray-100">
        <history-row v-for="(item, index) in list" :key="item.id" :item="item" :index="index" />
      </tbody>
    </table>
  </div>
</template>

<script>
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
  data: () => ({
    loading: true,
    list: []
  }),
  async mounted() {
    const list = await this.$store.dispatch('fetchSessionsList')
    this.list = list.reverse()
    this.loading = false
  }
}
</script>
