<template>
  <div class="w-28 h-28 md:w-40 md:h-36 ml-2 mt-2">
    <button
      type="button"
      class="item-button"
      @click="clickHandler"
    >
      <div class="w-full text-sm md:text-lg leading-4 md:leading-6 font-semibold">
        <div class="overflow-ellipsis overflow-hidden">
          {{ item.label }}
        </div>
      </div>
      <div
        class="absolute -top-px -right-px z-10 rounded-tr-sm bg-pink-500 text-white text-xs uppercase py-0.5 px-1.5 font-semibold"
        v-if="item.isCustom"
      >
        custom
      </div>
      <div
        class="absolute -top-px -right-px z-10 rounded-tr-sm bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 md:text-xl uppercase py-1 px-2 font-mono font-semibold"
        v-else
      >
        {{ item.price }}
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
              :max="20"
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
          <div class="mt-6 mx-auto w-40" v-if="item.isCustom">
            <input
              type="text"
              v-model="customPrice"
              class="form-control text-center text-xl font-semibold placeholder-gray-400"
              placeholder="Цена за ед., ₴"
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
  components: {
    NumericInput
  },
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
  computed: {
    isSession() {
      return Object.keys(this.$store.getters.session).length > 0
    },
    session() {
      return this.$store.getters.session
    },
    isSessionOwn() {
      return this.$store.getters.info.uid === this.$store.getters.session.uid
    },
    timestamp() {
      return this.date.getTime()
    }
  },
  methods: {
    clickHandler() {
      if (!this.isSession) {
        this.$toast.default('Смена не открыта')
      } else if (!this.isSessionOwn) {
        this.$toast.default('Смена занята')
      } else {
        this.showOrderModal = true
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
        const isCustom = this.item.isCustom ? true : false
        await this.$store.dispatch('addOrder', {
          sid: this.session.id,
          id,
          category,
          label,
          price: isCustom ? this.customPrice : this.item.price,
          count: this.count,
          time: this.timestamp,
          byCard: this.byCard,
          isCustom
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
