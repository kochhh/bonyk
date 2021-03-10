<template>
  <div class="ml-auto">
    <a
      href="#"
      class="underline text-xs text-blue-500 hover:no-underline"
      @click.prevent="showCategoryCreate = true"
    >Создать новую</a>
    <t-modal-form
      v-model="showCategoryCreate"
      header="Создать новую категорию"
      ref="modalCategoryCreate"
      @opened="onOpened"
      @before-close="onBeforeClose"
    >
      <form @submit.prevent="submitHandler">
        <div class="p-4">
          <div class="flex space-x-2">
            <div class="w-40">
              <input
                type="text"
                v-model.trim="name"
                ref="name"
                class="form-control"
                :class="{ 'border-red-500': $v.name.$dirty && !$v.name.required }"
                placeholder="Имя (латиницей)"
              >
              <p class="mt-2 text-xs text-gray-400">Возможные варианты:<br>beer, cocktail, coffee, cognac, food, rum, tea, tequila, vodka, water, whiskey, wine</p>
              <div
                class="mt-2 text-red-500 text-xs"
                v-if="$v.name.$dirty && !$v.name.required"
              >Введите имя категории</div>
            </div>
            <div class="flex-grow">
              <input
                type="text"
                v-model.trim="label"
                class="form-control"
                placeholder="Название"
              >
            </div>
          </div>
        </div>
        <div class="py-3 px-4 rounded-b bg-gray-100 border-t border-gray-200">
          <div class="flex justify-between items-center">
            <button
              type="button"
              class="btn btn-link"
              @click="showCategoryCreate = false"
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
  data() {
    return {
      showCategoryCreate: false,
      name: '',
      label: '',
      enabled: true
    }
  },
  validations: {
    name: { required }
  },
  methods: {
    async submitHandler() {
      if (this.$v.$invalid) {
        this.$v.$touch()
        return
      }

      try {
        const category = await this.$store.dispatch('createCategory', {
          name: this.name,
          label: this.label ? this.label : this.name,
          enabled: this.enabled
        })
        this.name = ''
        this.label = ''
        this.$v.$reset()
        this.$emit('created', category)
        this.$refs.modalCategoryCreate.hide()
        this.$toast.success('Категория была создана')
      } catch (e) {}
    },
    onOpened() {
      this.$nextTick(() => {
        this.$refs.name.focus()
      })
    },
    onBeforeClose() {
      this.$v.$reset()
    }
  }
}
</script>
