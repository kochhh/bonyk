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
    <table class="min-w-full divide-y divide-gray-100 shadow-sm border border-gray-200 mb-8" v-else>
      <thead>
        <tr>
          <th class="px-3 py-2 font-semibold text-left bg-gray-100 border-b w-12">
            №
          </th>
          <th class="px-3 py-2 font-semibold text-left bg-gray-100 border-b">
            Позиция
          </th>
          <th class="px-3 py-2 font-semibold text-right bg-gray-100 border-b w-32">
            Цена
          </th>
          <th class="px-3 py-2 font-semibold text-right bg-gray-100 border-b w-32">
            Кол-во
          </th>
          <th class="px-3 py-2 font-semibold text-right bg-gray-100 border-b w-32">
            Стоимость
          </th>
        </tr>
      </thead>
      <tbody class="divide-y divide-gray-100">
        <tr v-for="(item, index) in items" :key="item.id">
          <td class="px-3 py-2 whitespace-nowrap">
            {{ index + 1 }}
          </td>
          <td class="px-3 py-2">
            {{ item.label }}
          </td>
          <td class="px-3 py-2 whitespace-nowrap text-right">
            {{ item.price | currency() }}
          </td>
          <td class="px-3 py-2 whitespace-nowrap text-right">
            {{ item.count }}
          </td>
          <td class="px-3 py-2 whitespace-nowrap text-right">
            {{ item.price * item.count | currency() }}
          </td>
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <td class="px-3 py-2 text-right bg-gray-100 border-t" colspan="5">
            Итого: <span class="font-bold ml-1">{{ this.total | currency() }}</span>
          </td>
        </tr>
      </tfoot>
    </table>
  </div>
</template>

<script>
export default {
  name: 'Session',
  metaInfo() {
    return {
      title: this.$title('Заказы по смене')
    }
  },
  data: () => ({
    loading: true,
    id: null,
    items: []
  }),
  computed: {
    total() {
      let total = 0
      for (let i = 0; i < this.items.length; i++) {
        total += this.items[i].price * this.items[i].count
      }
      return total
    }
  },
  async mounted() {
    this.id = this.$route.params.id
    this.items = await this.$store.dispatch('fetchOrders', this.id)
    this.loading = false
  }
}
</script>
