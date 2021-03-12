<template>
  <div>
    <h1 class="mb-6">История смен</h1>
    <loader v-if="loading" />
    <table class="min-w-full divide-y divide-gray-100 shadow-sm border border-gray-200 mb-8" v-else>
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
            Бармен
          </th>
        </tr>
      </thead>
      <tbody class="divide-y divide-gray-100">
        <tr v-for="(item, index) in list" :key="item.id">
          <td class="px-3 py-2 whitespace-nowrap">
            {{ index + 1 }}
          </td>
          <td class="px-3 py-2 whitespace-nowrap">
            <router-link :to="{ name: 'Session', params: { id: item.id } }" class="link">
              <span v-if="item.timestart">{{ item.timestart | date('date') }}</span>
              <span v-else>-</span>
            </router-link>
          </td>
          <td class="px-3 py-2 whitespace-nowrap">
            <span v-if="item.timestart">{{ item.timestart | date('time') }}</span>
            <span v-else>-</span>
          </td>
          <td class="px-3 py-2 whitespace-nowrap">
            {{ item.name || '-' }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'History',
  metaInfo() {
    return {
      title: this.$title('История смен')
    }
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
