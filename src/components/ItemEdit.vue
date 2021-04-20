<template>
  <div>
    <button
      type="button"
      class="btn btn-green py-1 px-3 shadow-none"
      @click="showItemEdit = true"
      title="Редактировать"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" class="w-4 h-4" fill="currentColor" viewBox="0 0 16 16">
        <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5L13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175l-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
      </svg>
    </button>
    <t-modal-form
      v-model="showItemEdit"
      header="Редактировать"
      ref="modalItemEdit"
      tabindex="-1"
      @opened="onOpened"
      @before-close="onBeforeClose"
    >
      <form @submit.prevent="submitHandler">
        <div class="py-6 px-4">
          <div class="flex space-x-2">
            <div class="flex-grow">
              <input
                type="text"
                ref="label"
                @change="setLabel($event.target.value)"
                class="form-control"
                :class="{ 'border-red-500 dark:border-red-500': $v.newLabel.$dirty && !$v.newLabel.required }"
                placeholder="Название, объём"
              >
              <div class="mt-2 text-red-500 text-xs" v-if="$v.newLabel.$dirty && !$v.newLabel.required">
                Введите название позиции
              </div>
            </div>
            <div class="flex-shrink-0 w-28" v-if="!item.isCustom">
              <input
                type="text"
                ref="price"
                @change="setPrice($event.target.value)"
                class="form-control"
                :class="{ 'border-red-500 dark:border-red-500': $v.newPrice.$dirty && !$v.newPrice.required || $v.newPrice.$dirty && !$v.newPrice.numeric }"
                placeholder="Цена, ₴"
              >
              <div class="mt-2 text-red-500 text-xs" v-if="$v.newPrice.$dirty && !$v.newPrice.required">
                Введите цену
              </div>
              <div class="mt-2 text-red-500 text-xs" v-if="$v.newPrice.$dirty && !$v.newPrice.numeric">
                Введите число
              </div>
            </div>
          </div>
        </div>
        <div class="py-3 px-4 border-t rounded-b bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600">
          <div class="flex justify-end space-x-8 items-center">
            <button
              type="button"
              class="btn btn-link"
              @click="showItemEdit = false"
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
import { required, numeric } from 'vuelidate/lib/validators'

export default {
  props: {
    category: {
      type: String,
      required: true
    },
    item: {
      type: Object,
      required: true
    }
  },
  data: () => ({
    loading: false,
    showItemEdit: false,
    isCustom: false,
    newLabel: null,
    newPrice: null
  }),
  validations: {
    newLabel: { required },
    newPrice: { required, numeric }
  },
  methods: {
    setLabel(val) {
      this.newLabel = val
    },
    setPrice(val) {
      this.newPrice = +val
    },
    async submitHandler() {
      if (this.newLabel === null) this.newLabel = this.item.label
      if (!this.item.isCustom) {
        if (this.newPrice === null) this.newPrice = this.item.price
      } else {
        this.newPrice = this.item.price
      }

      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }

      try {
        this.loading = true
        await this.$store.dispatch('editItem', {
          id: this.item.id,
          label: this.newLabel,
          price: this.newPrice,
          cid: this.category
        })
        this.loading = false
        this.$emit('edited', this.newLabel, this.newPrice)
        this.$refs.modalItemEdit.hide()
        this.$toast.success('Позиция обновлена')
      } catch(e) {}
    },
    onOpened() {
      this.$nextTick(() => {
        this.$refs.label.value = this.newLabel = this.item.label
        if (!this.item.isCustom) {
          this.$refs.price.value = this.newPrice = this.item.price
        }
        this.$refs.label.focus()
      })
    },
    onBeforeClose() {
      this.$v.$reset()
    }
  }
}
</script>
