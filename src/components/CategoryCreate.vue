<template>
  <div>
    <button
      type="button"
      class="btn btn-green shadow-none py-1 px-3"
      title="Создать новую"
      @click="showModal = true"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
        <path d="M.5 3l.04.87a1.99 1.99 0 0 0-.342 1.311l.637 7A2 2 0 0 0 2.826 14H9v-1H2.826a1 1 0 0 1-.995-.91l-.637-7A1 1 0 0 1 2.19 4h11.62a1 1 0 0 1 .996 1.09L14.54 8h1.005l.256-2.819A2 2 0 0 0 13.81 3H9.828a2 2 0 0 1-1.414-.586l-.828-.828A2 2 0 0 0 6.172 1H2.5a2 2 0 0 0-2 2zm5.672-1a1 1 0 0 1 .707.293L7.586 3H2.19c-.24 0-.47.042-.684.12L1.5 2.98a1 1 0 0 1 1-.98h3.672z"/>
        <path d="M13.5 10a.5.5 0 0 1 .5.5V12h1.5a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0V13h-1.5a.5.5 0 0 1 0-1H13v-1.5a.5.5 0 0 1 .5-.5z"/>
      </svg>
    </button>
    <t-modal-form
      v-model="showModal"
      header="Создать новую категорию"
      ref="modalCreate"
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
                placeholder="Имя (latin)"
              >
              <p class="mt-2 text-xs text-gray-300">
                <span class="text-gray-500">beer</span><br>
                <span class="text-gray-500">long</span><br>
                <span class="text-gray-500">shot</span><br>
                <span class="text-gray-500">strong</span><br>
                <span class="text-gray-500">vodka</span><br>
                <span class="text-gray-500">tequila</span><br>
                <span class="text-gray-500">whiskey</span><br>
                <span class="text-gray-500">wine</span><br>
                <span class="text-gray-500">hot</span><br>
                <span class="text-gray-500">cold</span><br>
                <span class="text-gray-500">food</span>
              </p>
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
              @click="showModal = false"
            >Отмена</button>
            <button
              type="submit"
              class="btn btn-green"
              :disabled="loading"
              :class="{ 'disabled:opacity-50 disabled:cursor-not-allowed hover:bg-green-500': loading }"
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
      loading: false,
      showModal: false,
      name: '',
      label: ''
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
        this.loading = true
        const category = await this.$store.dispatch('createCategory', {
          name: this.name,
          label: this.label ? this.label : this.name,
          enabled: true
        })
        this.loading = false
        this.name = this.label = ''
        this.$v.$reset()
        this.$emit('created', category)
        this.$refs.modalCreate.hide()
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
