<template>
  <div class="w-40 h-40 ml-1 mb-1">
    <button
      type="button"
      class="w-full h-full btn bg-gray-100 border-gray-300 rounded-sm flex flex-col py-5 shadow-none"
      @click.prevent="clickHandler"
    >
      <div class="w-full flex-grow">
        <span class="text-lg font-semibold max-w-full overflow-hidden overflow-ellipsis inline-block">
          {{ item.label }}
        </span>
      </div>
      <div class="w-full mt-auto">
        <span class="text-3xl font-semibold">
          {{ item.price }}
        </span>
      </div>
    </button>
    <t-modal-form
      v-model="showOrderModal"
      header="Заказ"
      ref="orderModal"
      tabindex="-1"
    >
      <form @submit.prevent="submitHandler">
        <div class="py-8 px-4 relative">
          <numeric-input v-model="count" :min="1" :max="10" :step="1" />
          <label class="inline-flex items-center space-x-2 absolute right-4 top-1/2 transform -translate-y-1/2">
            <input
              type="checkbox"
              name="by-card"
              v-model="byCard"
              class="text-blue-500 transition duration-100 ease-in-out border-gray-300 rounded shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none focus:ring-opacity-50 focus:ring-offset-0 disabled:opacity-50 disabled:cursor-not-allowed"
            >
            <span>На карту</span>
          </label>
        </div>
        <div class="py-3 px-4 rounded-b bg-gray-100 border-t border-gray-200">
          <div class="flex justify-between items-center">
            <button
              type="button"
              class="btn btn-link"
              @click="showOrderModal = false"
            >Отмена</button>
            <button
              type="submit"
              class="btn btn-green"
            >Добавить</button>
          </div>
        </div>
      </form>
    </t-modal-form>
  </div>
</template>

<script>
import NumericInput from '@/components/NumericInput'

export default {
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  data: () => ({
    showOrderModal: false,
    count: 1,
    byCard: false,
    date: new Date(),
    interval: null
  }),
  components: {
    NumericInput
  },
  methods: {
    clickHandler() {
      if (this.session && Object.keys(this.session).length > 0) {
        this.showOrderModal = true
      } else {
        this.$toast.default('Смена не открыта')
      }
    },
    async submitHandler() {
      try {
        const { id, label, price } = this.item
        await this.$store.dispatch('addOrder', {
          activeSid: this.session.id,
          time: this.timestamp,
          count: this.count,
          byCard: this.byCard,
          id, label, price
        })
        this.$refs.orderModal.hide()
        this.$toast.success('Добавлено')
      } catch (e) {}
    }
  },
  computed: {
    timestamp() {
      return this.date.getTime()
    },
    session() {
      return this.$store.getters.session
    }
  },
  mounted() {
    this.interval = setInterval(() => {
      this.date = new Date()
    }, 1000)
  },
  beforeDestroy() {
    clearInterval(this.interval)
  }
}
</script>
