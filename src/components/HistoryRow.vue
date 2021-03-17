<template>
  <tr>
    <td class="px-3 py-2 whitespace-nowrap">
      {{ item.number }}
    </td>
    <td class="px-3 py-2 whitespace-nowrap">
      <router-link :to="{ name: 'Session', params: { id: item.id } }" class="link">
        {{ item.timestart | date('datetime') }}
      </router-link>
    </td>
    <td class="px-3 py-2 whitespace-nowrap">
      {{ item.timeend | date('datetime') }}
    </td>
    <td class="px-3 py-2 whitespace-nowrap">
      {{ item.name || '?' }}
    </td>
    <td class="px-3 py-2 whitespace-nowrap">
      <div class="flex items-center">
        <button
          type="button"
          class="btn btn-blue py-1 px-2 shadow-none mr-2"
          v-if="!isSession"
        >
          <download-excel
            type="csv"
            :fetch="fetchData"
            :fields="dataFields"
            :footer="dataFooter"
            :name="getFormattedTime"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="currentColor" viewBox="0 0 16 16">
              <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/>
              <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z"/>
            </svg>
          </download-excel>
        </button>
        <button
          type="button"
          class="btn btn-green py-1 px-2 shadow-none"
          :class="{ 'disabled:opacity-50 disabled:cursor-not-allowed hover:bg-green-500': loading }"
          :disabled="loading"
          v-if="isSessionResumable && !isSession"
          @click="resumeHandler"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="currentColor" viewBox="0 0 16 16">
            <path d="M12.14 8.753l-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z"/>
          </svg>
        </button>
      </div>
    </td>
  </tr>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  data: () => ({
    loading: false,
    timestamp: new Date().getTime(),
    dataFooter: []
  }),
  computed: {
    isSession() {
      return Object.keys(this.$store.getters.session).length > 0
    },
    isSessionResumable() {
      return this.timestamp - this.item.timestart < 24 * 60 * 60 * 1000
    },
    getFormattedTime() {
      const date = new Date(this.item.timestart)
      const year = date.getFullYear()
      const month = date.getMonth() < 9 ? `0${date.getMonth() + 1}` : date.getMonth() + 1
      const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate()
      const hour = date.getHours() < 10 ? `0${date.getHours()}` : date.getHours()
      const min = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes()
      return `mmc-${year}${month}${day}-${hour}${min}.csv`
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
  mounted() {
    this.interval = setInterval(() => {
      this.timestamp = new Date().getTime()
    }, 1000)
  },
  beforeDestroy() {
    clearInterval(this.interval)
  },
  methods: {
    async resumeHandler() {
      const res = await this.$dialog.confirm({
        title: 'Продолжить смену?',
        icon: 'info',
        cancelButtonText: 'Отмена'
      })
      if (res.isOk) {
        this.loading = true
        await this.$store.dispatch('resumeSession', this.item.id)
        this.loading = false
        this.$toast.default('Вы возобновили смену')
      }
    },
    async fetchData() {
      const res = (await this.$store.dispatch('fetchOrders', {
        id: this.item.id
      }))

      if (!res.length) {
        this.$toast.default('В этой смене не было заказов')
        return
      }

      const resMapped = res.map((item, index) => {
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

      const cash = res.filter(el => !el.byCard).reduce((acc, cur) => acc + +cur.count * +cur.price, 0) || 0
      const card = res.filter(el => el.byCard).reduce((acc, cur) => acc + +cur.count * +cur.price, 0) || 0
      const total = cash + card
      this.dataFooter.push(`Наличные: ${cash} ₴`, `Карта: ${card} ₴`, `Всего: ${total} ₴`)

      return resMapped
    }
  }
}
</script>
