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
    <table v-else class="min-w-full divide-y divide-gray-100 shadow-sm border border-gray-200 mb-8 text-sm">
      <thead>
        <tr>
          <th class="px-3 py-2 font-semibold text-left bg-gray-100 border-b align-top w-12">
            №
          </th>
          <th class="px-3 py-2 font-semibold text-left bg-gray-100 border-b align-top w-24">
            Категория
          </th>
          <th class="px-3 py-2 font-semibold text-left bg-gray-100 border-b align-top">
            Позиция
          </th>
          <th class="px-3 py-2 font-semibold text-right bg-gray-100 border-b align-top w-20">
            Цена
          </th>
          <th class="px-3 py-2 font-semibold text-right bg-gray-100 border-b align-top w-20">
            Кол-во
          </th>
          <th class="px-3 py-2 font-semibold text-right bg-gray-100 border-b align-top w-20">
            Всего
          </th>
          <th class="px-3 py-2 bg-gray-100 border-b w-12">
          </th>
        </tr>
      </thead>
      <tbody class="divide-y divide-gray-100">
        <tr v-for="(item, index) in items" :key="item.id">
          <td class="px-3 py-2 whitespace-nowrap align-top">
            {{ index + 1 }}
          </td>
          <td class="px-3 py-2 align-top">
            {{ item.category || '-' }}
          </td>
          <td class="px-3 py-2 align-top">
            {{ item.label }}
          </td>
          <td class="px-3 py-2 whitespace-nowrap text-right align-top">
            {{ item.price }} ₴
          </td>
          <td class="px-3 py-2 whitespace-nowrap text-right align-top">
            {{ item.count }}
          </td>
          <td class="px-3 py-2 whitespace-nowrap text-right align-top">
            {{ item.price * item.count }} ₴
          </td>
          <td class="px-3 py-2 whitespace-nowrap text-center align-top">
            <svg v-if="item.byCard" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-credit-card inline -mt-0.5" viewBox="0 0 16 16">
              <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4zm2-1a1 1 0 0 0-1 1v1h14V4a1 1 0 0 0-1-1H2zm13 4H1v5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V7z"/>
              <path d="M2 10a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1v-1z"/>
            </svg>
          </td>
        </tr>
      </tbody>
      <tfoot>
        <tr>
          <td class="px-3 py-2 text-right bg-gray-100 border-t" colspan="6">
            <div class="mb-2 pb-2 border-b border-gray-200">
              Нал: <span class="font-bold ml-1">{{ this.totalCash }} ₴</span>
              <br>
              Безнал: <span class="font-bold ml-1">{{ this.totalCard }} ₴</span>
            </div>
            <div>
              Итого: <span class="text-lg font-bold ml-1">{{ this.total }} ₴</span>
            </div>
          </td>
          <td class="px-3 py-2 bg-gray-100 border-t">
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
        total += +this.items[i].price * +this.items[i].count
      }
      return total
    },
    totalCash() {
      const items = this.items.filter(el => !el.byCard)
      let total = 0
      for (let i = 0; i < items.length; i++) {
        total += +items[i].price * +items[i].count
      }
      return total
    },
    totalCard() {
      const items = this.items.filter(el => el.byCard)
      let total = 0
      for (let i = 0; i < items.length; i++) {
        total += +items[i].price * +items[i].count
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
