<template>
  <div class="w-40 h-40 ml-1 mb-1">
    <button
      type="button"
      class="w-full h-full btn bg-gray-100 border-gray-300 rounded-sm flex flex-col py-5 shadow-none"
      :class="{ 'justify-center': item.isCustom }"
      @click.prevent="clickHandler"
    >
      <div class="w-full" :class="{ 'flex-grow': !item.isCustom }">
        <span class="text-lg font-semibold max-w-full overflow-hidden overflow-ellipsis inline-block">
          {{ item.label }}
        </span>
      </div>
      <div class="w-full mt-auto" v-if="!item.isCustom">
        <span class="text-3xl font-semibold">
          {{ item.price }}
        </span>
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
        <div class="py-6 px-4">
          <div class="relative">
            <numeric-input
              v-model="count"
              :min="1"
              :max="10"
              :step="1"
            />
            <label class="inline-flex items-center space-x-2 absolute right-4 top-1/2 transform -translate-y-1/2">
              <input
                type="checkbox"
                class="checkbox"
                v-model="byCard"
              >
              <span>На карту</span>
            </label>
          </div>
          <div class="mt-6 mx-auto w-40" v-if="item.isCustom">
            <input
              type="text"
              v-model="customPrice"
              class="form-control"
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
import { required, numeric } from 'vuelidate/lib/validators'

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
    session() {
      return this.$store.getters.session
    },
    isSessionActive() {
      return this.session && Object.keys(this.session).length > 0 || false
    },
    timestamp() {
      return this.date.getTime()
    }
  },
  methods: {
    clickHandler() {
      if (this.isSessionActive) {
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
