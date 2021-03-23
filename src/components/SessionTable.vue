<template>
  <table class="min-w-full shadow-sm border border-gray-200 dark:border-gray-700 mb-4 text-sm">
    <thead>
      <tr>
        <th class="px-3 py-2 font-semibold text-left bg-gray-100 dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700 w-10">
          №
        </th>
        <th class="px-3 py-2 font-semibold text-left bg-gray-100 dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700">
          Позиция
        </th>
        <th class="px-3 py-2 font-semibold text-right bg-gray-100 dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700 w-20">
          Время
        </th>
        <th class="px-3 py-2 font-semibold text-right bg-gray-100 dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700 w-20">
          Цена
        </th>
        <th class="px-3 py-2 font-semibold text-right bg-gray-100 dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700 w-20 whitespace-nowrap">
          Кол-во
        </th>
        <th class="px-3 py-2 font-semibold text-right bg-gray-100 dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700 w-20">
          Всего
        </th>
      </tr>
    </thead>
    <tbody class="divide-y divide-gray-100 dark:divide-gray-700">
      <tr v-for="item in items" :key="item.id">
        <td
          class="px-3 py-2 whitespace-nowrap align-top"
          :class="{ 'bg-gray-200 dark:bg-gray-700': item.byCard }"
        >
          {{ item.number }}
        </td>
        <td
          class="px-3 py-2 align-top"
          :class="{ 'bg-gray-200 dark:bg-gray-700': item.byCard }"
        >
          {{ item.label }}
        </td>
        <td
          class="px-3 py-2 whitespace-nowrap text-right align-top"
          :class="{ 'bg-gray-200 dark:bg-gray-700': item.byCard }"
        >
          {{ item.time | date('time') }}
        </td>
        <td
          class="px-3 py-2 whitespace-nowrap text-right align-top"
          :class="{ 'bg-gray-200 dark:bg-gray-700': item.byCard }"
        >
          {{ item.price }} ₴
        </td>
        <td
          class="px-3 py-2 whitespace-nowrap text-right align-top"
          :class="{ 'bg-gray-200 dark:bg-gray-700': item.byCard }"
        >
          {{ item.count }}
        </td>
        <td
          class="px-3 py-2 whitespace-nowrap text-right align-top"
          :class="{ 'bg-gray-200 dark:bg-gray-700': item.byCard }"
        >
          {{ item.price * item.count }} ₴
        </td>
      </tr>
    </tbody>
    <tfoot>
      <tr>
        <td class="px-3 py-2 bg-gray-100 dark:bg-gray-800 border-t border-gray-100 dark:border-gray-700 align-bottom" colspan="2">
          <download-excel
            class="inline-block text-gray-400 hover:text-gray-500 transition-colors cursor-pointer"
            tabindex="0"
            :fetch="fetchData"
            :fields="dataFields"
            :header="dataHeader"
            :footer="dataFooter"
            type="csv"
            :name="`mmc-${getFormattedTime()}.csv`"
            title="Скачать в формате CSV"
            v-if="!isSession"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="21" height="28" fill="currentColor" viewBox="0 0 384 512">
              <path d="M224 136V0H24C10.7 0 0 10.7 0 24v464c0 13.3 10.7 24 24 24h336c13.3 0 24-10.7 24-24V160H248c-13.2 0-24-10.8-24-24zm-96 144c0 4.42-3.58 8-8 8h-8c-8.84 0-16 7.16-16 16v32c0 8.84 7.16 16 16 16h8c4.42 0 8 3.58 8 8v16c0 4.42-3.58 8-8 8h-8c-26.51 0-48-21.49-48-48v-32c0-26.51 21.49-48 48-48h8c4.42 0 8 3.58 8 8v16zm44.27 104H160c-4.42 0-8-3.58-8-8v-16c0-4.42 3.58-8 8-8h12.27c5.95 0 10.41-3.5 10.41-6.62 0-1.3-.75-2.66-2.12-3.84l-21.89-18.77c-8.47-7.22-13.33-17.48-13.33-28.14 0-21.3 19.02-38.62 42.41-38.62H200c4.42 0 8 3.58 8 8v16c0 4.42-3.58 8-8 8h-12.27c-5.95 0-10.41 3.5-10.41 6.62 0 1.3.75 2.66 2.12 3.84l21.89 18.77c8.47 7.22 13.33 17.48 13.33 28.14.01 21.29-19 38.62-42.39 38.62zM256 264v20.8c0 20.27 5.7 40.17 16 56.88 10.3-16.7 16-36.61 16-56.88V264c0-4.42 3.58-8 8-8h16c4.42 0 8 3.58 8 8v20.8c0 35.48-12.88 68.89-36.28 94.09-3.02 3.25-7.27 5.11-11.72 5.11s-8.7-1.86-11.72-5.11c-23.4-25.2-36.28-58.61-36.28-94.09V264c0-4.42 3.58-8 8-8h16c4.42 0 8 3.58 8 8zm121-159L279.1 7c-4.5-4.5-10.6-7-17-7H256v128h128v-6.1c0-6.3-2.5-12.4-7-16.9z"/>
            </svg>
          </download-excel>
          <download-excel
            class="inline-block text-gray-400 hover:text-gray-500 transition-colors cursor-pointer ml-3"
            tabindex="0"
            :fetch="fetchData"
            :fields="dataFields"
            :header="dataHeader"
            :footer="dataFooter"
            :name="`mmc-${getFormattedTime()}.xls`"
            title="Скачать в формате XLS"
            v-if="!isSession"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="21" height="28" fill="currentColor" viewBox="0 0 384 512">
              <path d="M224 136V0H24C10.7 0 0 10.7 0 24v464c0 13.3 10.7 24 24 24h336c13.3 0 24-10.7 24-24V160H248c-13.2 0-24-10.8-24-24zm60.1 106.5L224 336l60.1 93.5c5.1 8-.6 18.5-10.1 18.5h-34.9c-4.4 0-8.5-2.4-10.6-6.3C208.9 405.5 192 373 192 373c-6.4 14.8-10 20-36.6 68.8-2.1 3.9-6.1 6.3-10.5 6.3H110c-9.5 0-15.2-10.5-10.1-18.5l60.3-93.5-60.3-93.5c-5.2-8 .6-18.5 10.1-18.5h34.8c4.4 0 8.5 2.4 10.6 6.3 26.1 48.8 20 33.6 36.6 68.5 0 0 6.1-11.7 36.6-68.5 2.1-3.9 6.2-6.3 10.6-6.3H274c9.5-.1 15.2 10.4 10.1 18.4zM384 121.9v6.1H256V0h6.1c6.4 0 12.5 2.5 17 7l97.9 98c4.5 4.5 7 10.6 7 16.9z"/>
            </svg>
          </download-excel>
        </td>
        <td class="px-3 py-2 text-right bg-gray-100 dark:bg-gray-800 border-t border-gray-100 dark:border-gray-700" colspan="4">
          <div class="flex justify-end mb-2">
            <span class="py-1 px-2 rounded-sm whitespace-nowrap">
              Cash: <span class="font-bold ml-1">{{ totalCash }} ₴</span>
            </span>
            <span class="py-1 px-2 bg-gray-200 dark:bg-gray-700 rounded-sm whitespace-nowrap ml-2">
              Card: <span class="font-bold ml-1">{{ totalCard }} ₴</span>
            </span>
          </div>
          <div>
            Итого: <span class="text-lg font-bold ml-1">{{ total }} ₴</span>
          </div>
        </td>
      </tr>
    </tfoot>
  </table>
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      required: true
    },
    totalItems: {
      type: Array,
      required: true
    }
  },
  data: () => ({
    info: {},
    dataHeader: [],
    dataFooter: []
  }),
  computed: {
    totalCash() {
      return this.totalItems
        .filter(el => !el.byCard)
        .reduce((acc, cur) => acc + +cur.count * +cur.price, 0) || 0
    },
    totalCard() {
      return this.totalItems
        .filter(el => el.byCard)
        .reduce((acc, cur) => acc + +cur.count * +cur.price, 0) || 0
    },
    total() {
      return this.totalCash + this.totalCard
    },
    isSession() {
      return Object.keys(this.$store.getters.session).length > 0
    },
    dataFields() {
      return {
        '№': 'number',
        'Категория': 'category',
        'Название': 'label',
        'Цена': 'price',
        'Кол-во': 'count',
        'Стоимость': 'cost',
        'Оплата': 'byCard',
        'Время продажи': 'time'
      }
    }
  },
  methods: {
    async fetchSessionInfo() {
      return (await this.$store.dispatch('fetchSessionById', {
        id: this.$route.params.id
      }))
    },
    getFormattedTime() {
      const date = new Date(+this.info.timestart)
      const year = date.getFullYear()
      const month = date.getMonth() < 9 ? `0${date.getMonth() + 1}` : date.getMonth() + 1
      const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()
      const hour = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours()
      const min = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes()
      return `${year}${month}${day}-${hour}${min}`
    },
    async fetchData() {
      const orders = await this.$store.dispatch('fetchOrders', {
        id: this.$route.params.id
      })

      const ordersData = orders.map((item, index) => {
        const container = {}
        const { category, label, price, count, byCard, time } = item

        container.number = index + 1
        container.category = category
        container.label = label
        container.price = `${price} ₴`
        container.count = count
        container.cost = `${price * count} ₴`
        container.byCard = byCard ? 'Карта' : 'Наличные'
        container.time = this.$options.filters.date(time, 'datetime')

        return container
      })

      this.dataHeader = [
        `Открыта: ${this.$options.filters.date(this.info.timestart, 'datetime')}`,
        `Закрыта: ${this.$options.filters.date(this.info.timeend, 'datetime')}`,
        `Мероприятие: ${this.info.event}`,
        `Бармен: ${this.info.name}`
      ]
      const byCash = orders.filter(el => !el.byCard).reduce((acc, cur) => acc + +cur.count * +cur.price, 0) || 0
      const byCard = orders.filter(el => el.byCard).reduce((acc, cur) => acc + +cur.count * +cur.price, 0) || 0
      const total = byCash + byCard
      this.dataFooter = [
        `Наличные: ${byCash} ₴`,
        `Карта: ${byCard} ₴`,
        `Всего: ${total} ₴`
      ]

      return ordersData
    }
  },
  async mounted() {
    this.info = await this.fetchSessionInfo()
  }
}
</script>
