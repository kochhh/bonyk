<template>
  <div class="w-28 h-28 md:w-40 md:h-36 ml-1 mb-1">
    <button
      type="button"
      class="w-full h-full py-4 px-2 md:px-4 btn bg-gray-100 border-gray-300 rounded-sm shadow-none flex flex-col"
      :class="{ 'bg-blue-50': item.isCustom }"
      @click.prevent="clickHandler"
    >
      <div class="w-full flex-shrink-0 font-semibold text-2xl md:text-3xl leading-7" v-if="!item.isCustom">
        {{ item.price }}
      </div>
      <div class="w-full flex-shrink-0 mt-auto font-semibold leading-4 md:leading-5 text-sm md:text-base">
        <div class="line-clamp-2">
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
        <div class="py-8 px-4">
          <div class="relative">
            <numeric-input
              v-model="count"
              :min="1"
              :max="10"
              :step="1"
            />
            <label class="flex justify-center items-center space-x-2 mt-4 sm:mt-0 sm:absolute sm:right-0 sm:top-1/2 sm:transform sm:-translate-y-1/2">
              <input
                type="checkbox"
                class="checkbox"
                v-model="byCard"
              >
              <span>На карту</span>
            </label>
          </div>
          <div class="mt-8 mx-auto w-32" v-if="item.isCustom">
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
              Введите цену числом
            </div>
          </div>
        </div>
        <div class="py-3 px-4 rounded-b bg-gray-100 border-t border-gray-200">
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
        const price = this.item.isCustom ? this.customPrice : this.item.price
        await this.$store.dispatch('addOrder', {
          sid: this.session.id,
          id,
          category,
          label,
          price,
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
