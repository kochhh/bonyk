<template>
  <div class="ml-auto">
    <button
      type="button"
      class="btn btn-yellow shadow-none py-1 px-3"
      title="Редактировать"
      @click="showModal = true"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-toggles" viewBox="0 0 16 16">
        <path d="M4.5 9a3.5 3.5 0 1 0 0 7h7a3.5 3.5 0 1 0 0-7h-7zm7 6a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5zm-7-14a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zm2.45 0A3.49 3.49 0 0 1 8 3.5 3.49 3.49 0 0 1 6.95 6h4.55a2.5 2.5 0 0 0 0-5H6.95zM4.5 0h7a3.5 3.5 0 1 1 0 7h-7a3.5 3.5 0 1 1 0-7z"/>
      </svg>
    </button>
    <t-modal-form
      v-model="showModal"
      header="Удалить категории"
      ref="modalCategoriesEdit"
    >
      <form>
        <div class="p-4">
          <ul class="list-none m-0 p-0 flex flex-wrap justify-center -ml-1 -mt-1">
            <li
              v-for="item in categories"
              :key="item.id"
              class="ml-1 mt-1 w-24 h-20 p-2 flex flex-col items-center text-center bg-gray-100 border border-gray-200 text-xs rounded-sm"
            >
              <span>
                {{ item.label }}
              </span>
              <button
                type="button"
                class="btn btn-red py-1 px-3 shadow-none mt-auto"
                @click="removeHandler(item.id)"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                  <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                  <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                </svg>
              </button>
            </li>
          </ul>
        </div>
        <div class="py-3 px-4 rounded-b bg-gray-100 border-t border-gray-200">
          <div class="flex justify-between items-center">
            <button
              type="button"
              class="btn btn-link"
              @click="showModal = false"
            >Отмена</button>
          </div>
        </div>
      </form>
    </t-modal-form>
  </div>
</template>

<script>
export default {
  props: {
    categories: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      showModal: false
    }
  },
  methods: {
    async removeHandler(id) {
      const res = await this.$dialog.confirm({
        title: 'Удалить категорию?',
        icon: 'warning',
        cancelButtonText: 'Отмена'
      })
      if (res.isOk) {
        try {
          await this.$store.dispatch('removeCategory', id)
          this.$emit('removed', id)
          this.$toast.success('Категория удалена')
        } catch (e) {}
      }
    }
  }
}
</script>
