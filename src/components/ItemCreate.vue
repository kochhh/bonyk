<template>
  <div class="ml-auto">
    <a
      href="#"
      class="underline text-xs text-blue-500 hover:no-underline"
      @click.prevent="showItemCreate=true"
    >Создать новую</a>
    <t-modal-form
      v-model="showItemCreate"
      header="Создать новую позицию"
      ref="modalItemCreate"
      @opened="onOpened"
      @before-close="onBeforeClose"
    >
      <form @submit.prevent="submitHandler">
        <div class="p-4">
          <div class="flex gap-2">
            <div class="flex-grow">
              <input
                type="text"
                ref="label"
                v-model.trim="label"
                class="form-control"
                :class="{ 'border-red-500': $v.label.$dirty && !$v.label.required }"
                placeholder="Название, объём"
              >
              <div
                class="mt-2 text-red-500 text-xs"
                v-if="$v.label.$dirty && !$v.label.required"
              >Введите название позиции</div>
            </div>
            <div class="w-40">
              <input
                type="text"
                v-model.trim="price"
                class="form-control"
                :class="{ 'border-red-500': $v.price.$dirty && !$v.price.required }"
                placeholder="Цена, ₴"
              >
              <div
                class="mt-2 text-red-500 text-xs"
                v-if="$v.price.$dirty && !$v.price.required"
              >Введите цену позиции</div>
            </div>
          </div>
        </div>
        <div class="py-3 px-4 rounded-b bg-gray-100 border-t border-gray-200">
          <div class="flex justify-between items-center">
            <button
              type="button"
              class="btn btn-link"
              @click="showItemCreate=false"
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
import { required } from 'vuelidate/lib/validators'

export default {
  props: {
    category: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      showItemCreate: false,
      label: '',
      price: '',
      enabled: true
    }
  },
  validations: {
    label: { required },
    price: { required }
  },
  methods: {
    async submitHandler() {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }

      try {
        const item = await this.$store.dispatch('createItem', {
          label: this.label,
          price: this.price,
          enabled: this.enabled,
          catId: this.category
        })
        this.label = ''
        this.price = ''
        this.$v.$reset()
        this.$toast.success('Позиция была создана')
        this.$emit('created', item)
        this.$refs.modalItemCreate.hide()
      } catch (e) {
      }
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
