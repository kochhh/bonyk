<template>
  <div>
    <button
      type="button"
      class="btn btn-green py-1 px-2 shadow-none"
      @click="clickHandler"
      title="Корректировать заказ"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" class="w-2.5 h-2.5" fill="currentColor" viewBox="0 0 16 16">
        <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5L13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175l-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
      </svg>
    </button>
    <app-loader v-if="loading" />
    <t-modal-form
      v-model="showOrderModal"
      ref="orderModal"
      tabindex="-1"
    >
      <template v-slot:header>
        Корректировать: {{ item.label }}
      </template>
      <form @submit.prevent="submitHandler">
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
            >Сохранить</button>
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
    customPrice: null
  }),
  validations: {
    customPrice: { required, numeric }
  },
  computed: {
    session() {
      return this.$store.getters.session
    },
    newData() {
      if (this.item.isCustom) {
        return {
          count: this.count,
          byCard: this.byCard,
          customPrice: this.customPrice
        }
      }
      return {
        count: this.count,
        byCard: this.byCard
      }
    }
  },
  methods: {
    clickHandler() {
      this.showOrderModal = true
      this.count = this.item.count
      this.byCard = this.item.byCard
    },
    async submitHandler() {
      if (this.item.isCustom && this.$v.$invalid) {
        this.$v.$touch()
        return
      }

      try {
        this.loading = true
        const updates = {
          price: this.item.isCustom ? this.newData.customPrice : this.item.price,
          count: this.newData.count,
          byCard: this.newData.byCard
        }
        await this.$store.dispatch('editOrder', {
          sid: this.session.id,
          id: this.item.id,
          ...updates
        })
        this.loading = false
        if (this.item.isCustom) {
          this.customPrice = null
        }
        this.$v.$reset()
        this.$emit('edited', this.item.id, updates)
        this.$refs.orderModal.hide()
        this.$toast.success('Заказ скорректирован')
      } catch (e) {}
    },
    onBeforeClose() {
      this.$v.$reset()
    }
  }
}
</script>
