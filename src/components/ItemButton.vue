<template>
  <div class="w-28 h-28 md:w-40 md:h-36 ml-2 mt-2">
    <button
      type="button"
      class="w-full h-full py-4 px-2 md:px-4 flex flex-col items-center border focus:outline-none focus:ring rounded-sm font-semibold text-center"
      :class="{
        'bg-gray-100 dark:bg-gray-800 border-gray-300 dark:border-gray-700': !item.isCustom,
        'bg-gray-200 dark:bg-gray-700 border-gray-300 dark:border-gray-600': item.isCustom
      }"
      @click.prevent="clickHandler"
    >
      <div class="w-full flex-shrink-0 text-2xl md:text-3xl leading-7" v-if="!item.isCustom">
        {{ item.price }}
      </div>
      <div class="w-full flex-shrink-0 mt-auto leading-4 md:leading-5 text-sm md:text-base">
        <div class="line-clamp-3">
          {{ item.label }}
        </div>
      </div>
    </button>
    <t-modal-form
      v-model="showOrderModal"
      ref="orderModal"
      tabindex="-1"
    >
      <template v-slot:header>
        {{ item.category }}: {{ item.label }}
      </template>
      <form @submit.prevent="addHandler">
        <div class="py-12 px-4 text-center">
          <div class="relative">
            <numeric-input
              v-model="count"
              :min="1"
              :max="10"
              :step="1"
            />
            <label class="inline-flex justify-center items-center space-x-2 mt-6 sm:mt-0 sm:absolute sm:right-0 sm:top-1/2 sm:transform sm:-translate-y-1/2">
              <input
                type="checkbox"
                class="checkbox dark:border-gray-600"
                v-model="byCard"
              >
              <span>На карту</span>
            </label>
          </div>
          <div class="mt-6 mx-auto w-28" v-if="item.isCustom">
            <input
              type="text"
              v-model="customPrice"
              class="form-control text-center text-xl font-semibold placeholder-gray-400"
              placeholder="Цена, ₴"
            >
            <div class="mt-2 text-red-500 text-xs" v-if="$v.customPrice.$dirty && !$v.customPrice.required">
              Введите цену
            </div>
            <div class="mt-2 text-red-500 text-xs" v-if="$v.customPrice.$dirty && !$v.customPrice.numeric">
              Введите число
            </div>
          </div>
        </div>
        <div class="py-3 px-4 border-t rounded-b bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600">
          <div class="flex justify-end space-x-8 items-center">
            <button
              type="button"
              class="btn btn-link"
              @click="showOrderModal = false"
            >Отмена</button>
            <button
              type="submit"
              class="btn btn-green"
              :disabled="loading"
              :class="{ 'disabled:opacity-50 disabled:cursor-not-allowed': loading }"
            >Добавить</button>
          </div>
        </div>
      </form>
    </t-modal-form>
  </div>
</template>

<script>
import NumericInput from '@/components/NumericInput'
import { required, numeric } from 'vuelidate/lib/validators'

export default {
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  data: () => ({
    loading: false,
    showOrderModal: false,
    count: 1,
    byCard: false,
    date: new Date(),
    interval: null,
    customPrice: null
  }),
  validations: {
    customPrice: { required, numeric }
  },
  components: {
    NumericInput
  },
  computed: {
    isSession() {
      return Object.keys(this.$store.getters.session).length > 0
    },
    session() {
      return this.$store.getters.session
    },
    timestamp() {
      return this.date.getTime()
    }
  },
  methods: {
    clickHandler() {
      if (this.isSession) {
        this.showOrderModal = true
      } else {
        this.$toast.default('Смена не открыта')
      }
    },
    async addHandler() {
      if (this.item.isCustom && this.$v.$invalid) {
        this.$v.$touch()
        return
      }

      try {
        this.loading = true
        const { id, category, label } = this.item
        await this.$store.dispatch('addOrder', {
          sid: this.session.id,
          id,
          category,
          label,
          price: this.item.isCustom ? this.customPrice : this.item.price,
          count: this.count,
          time: this.timestamp,
          byCard: this.byCard
        })
        this.loading = false
        this.count = 1
        this.byCard = false
        if (this.item.isCustom) {
          this.customPrice = null
        }
        this.$v.$reset()
        this.$refs.orderModal.hide()
        this.$toast.success('Добавлено')
      } catch (e) {}
    },
    onBeforeClose() {
      this.$v.$reset()
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
