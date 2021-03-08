<template>
  <div class="ml-auto">
    <a
      href="#"
      class="underline text-xs text-blue-500 hover:no-underline"
      @click.prevent="showCategoriesEdit=true"
    >Изменить набор</a>
    <t-modal-form
      v-model="showCategoriesEdit"
      header="Отметьте нужные категории"
      ref="modalCategoriesEdit"
    >
      <form @submit.prevent="submitHandler">
        <div class="p-4">
          <ul class="list-none m-0 p-0 flex flex-col gap-1" ref="checkList">
            <li v-for="c in categories" :key="c.id">
              <label class="inline-flex items-center space-x-2">
                <span class="inline-flex">
                  <input
                    type="checkbox"
                    name="categories"
                    :id="c.name"
                    :value="c.name"
                    :ref="c.name"
                    class="text-blue-500 transition duration-100 ease-in-out border-gray-300 rounded shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:outline-none focus:ring-opacity-50 focus:ring-offset-0 disabled:opacity-50 disabled:cursor-not-allowed"
                    :checked="c.enabled"
                  >
                </span>
                <span>{{ c.label }}</span>
              </label>
            </li>
          </ul>
        </div>
        <div class="py-3 px-4 rounded-b bg-gray-100 border-t border-gray-200">
          <div class="flex justify-between items-center">
            <button
              type="button"
              class="btn btn-link"
              @click="showCategoriesEdit=false"
            >Отмена</button>
            <button
              type="submit"
              class="btn btn-green"
            >Сохранить</button>
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
      showCategoriesEdit: false,
      checkedCategories: []
    }
  },
  computed: {
    getCheckedCategories() {
      const cats = new Array()
      for (let i = 0; i < this.categories.length; i++) {
        if (this.$refs[this.categories[i].name].checked) {
          cats.push({
            name: this.categories[i].name,
            label: this.categories[i].label,
            id: this.categories[i].id,
          })
        }
      }
      return cats
    }
  },
  methods: {
    async fetchCategories() {
      return await this.$store.dispatch('fetchCategories')
    },
    async submitHandler() {
      try {
        // console.log(this.getCheckedCategories)
        // await this.$store.dispatch('updateCategories', this.checkedCategories)
        // this.$toast.success('Список категорий успешно изменён')
        // this.$emit('updated', this.checkedCategories)
        // this.$refs.modalCategoryCreate.hide()
      } catch (e) {}
    }
  },
}
</script>
