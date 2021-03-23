<template>
  <div>
    <button
      type="button"
      class="btn btn-green shadow-none py-1 px-3"
      title="Создать новую"
      @click="showItemCreate = true"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="1rem" height="1rem" fill="currentColor" viewBox="0 0 16 16">
        <path d="M8 6.5a.5.5 0 0 1 .5.5v1.5H10a.5.5 0 0 1 0 1H8.5V11a.5.5 0 0 1-1 0V9.5H6a.5.5 0 0 1 0-1h1.5V7a.5.5 0 0 1 .5-.5z"/>
        <path d="M14 4.5V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h5.5L14 4.5zm-3 0A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V4.5h-2z"/>
      </svg>
    </button>
    <t-modal-form
      v-model="showItemCreate"
      header="Создать новую позицию"
      ref="modalItemCreate"
      @opened="onOpened"
      @before-close="onBeforeClose"
    >
      <form @submit.prevent="submitHandler">
        <div class="py-8 px-4">
          <div class="flex space-x-2">
            <div class="flex-grow">
              <input
                type="text"
                ref="label"
                v-model.trim="label"
                class="form-control"
                :class="{ 'border-red-500 dark:border-red-500': $v.label.$dirty && !$v.label.required }"
                placeholder="Название, объём"
              >
              <div class="mt-2 text-red-500 text-xs" v-if="$v.label.$dirty && !$v.label.required">
                Введите название позиции
              </div>
            </div>
            <div class="flex-shrink-0 w-28" v-if="!isCustom">
              <input
                type="text"
                v-model.number.trim="price"
                class="form-control"
                :class="{ 'border-red-500 dark:border-red-500': $v.price.$dirty && !$v.price.required || $v.price.$dirty && !$v.price.numeric }"
                placeholder="Цена, ₴"
              >
              <div class="mt-2 text-red-500 text-xs" v-if="$v.price.$dirty && !$v.price.required">
                Введите цену
              </div>
              <div class="mt-2 text-red-500 text-xs" v-if="$v.price.$dirty && !$v.price.numeric">
                Введите число
              </div>
            </div>
          </div>
          <div class="mt-4">
            <label class="inline-flex items-center space-x-2">
              <input
                type="checkbox"
                class="checkbox"
                v-model="isCustom"
              >
              <span>Кастомная позиция</span>
            </label>
          </div>
        </div>
        <div class="py-3 px-4 border-t rounded-b bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600">
          <div class="flex justify-end space-x-8 items-center">
            <button
              type="button"
              class="btn btn-link"
              @click="showItemCreate = false"
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
import { required, numeric } from 'vuelidate/lib/validators'

export default {
  props: {
    category: {
      type: String,
      required: true
    }
  },
  data: () => ({
    loading: false,
    showItemCreate: false,
    label: '',
    price: null,
    enabled: true,
    isCustom: false
  }),
  validations: {
    label: { required },
    price: { required, numeric }
  },
  methods: {
    async submitHandler() {
      this.price = this.isCustom ? 0 : +this.price

      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }

      try {
        this.loading = true
        const item = await this.$store.dispatch('createItem', {
          catId: this.category,
          label: this.label,
          price: this.price,
          enabled: this.enabled,
          isCustom: this.isCustom
        })
        this.loading = false
        this.label = this.price = ''
        this.isCustom = false
        this.$v.$reset()
        this.$toast.success('Позиция была создана')
        this.$emit('created', item)
        this.$refs.modalItemCreate.hide()
      } catch (e) {}
    },
    onOpened() {
      this.$nextTick(() => {
        this.$refs.label.focus()
      })
    },
    onBeforeClose() {
      this.$v.$reset()
    }
  }
}
</script>
