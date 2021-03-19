<template>
  <div>
    <div class="flex items-center mb-4">
      <h2>Выберите категорию</h2>
      <div class="ml-auto flex">
        <div class="ml-3">
          <categories-edit v-if="categories.length" :categories="categories" @removed="removeCategory" />
        </div>
        <div class="ml-3">
          <category-create @created="addNewCategory" />
        </div>
      </div>
    </div>
    <div class="mb-8">
      <app-loader v-if="categoriesLoading" />
      <select v-else class="form-control" v-model="category" @change="selectHandler">
        <option :value="null" selected disabled>Выберите...</option>
        <option v-for="item in categories" :key="item.id" :value="item.id">
          {{ item.label }}
        </option>
      </select>
    </div>
    <div v-if="isCategorySelected">
      <div class="flex items-baseline mb-4">
        <h2>Позиции</h2>
        <div class="ml-auto">
          <item-create :category="category" @created="addNewItem" />
        </div>
      </div>
      <app-loader v-if="itemsLoading" />
      <div v-else-if="items.length" class="w-full overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-100 shadow-sm border border-gray-200 mb-8 text-sm">
          <thead>
            <tr>
              <th class="px-3 py-2 font-semibold text-left bg-gray-100 border-b w-12">Вкл?</th>
              <th class="px-3 py-2 font-semibold text-left bg-gray-100 border-b">Название</th>
              <th class="px-3 py-2 font-semibold text-left bg-gray-100 border-b w-16">Цена</th>
              <th class="px-3 py-2 font-semibold text-left bg-gray-100 border-b w-24">Действия</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-100">
            <items-edit-row
              v-for="item in items"
              :key="item.id"
              :category="category"
              :item="item"
              @removed="removeItem"
            />
          </tbody>
        </table>
      </div>
      <div v-else class="mb-8">
        В данной категории позиций пока нет.<br>
        Создайте новую, нажав на кнопку выше.
      </div>
    </div>
  </div>
</template>

<script>
import CategoriesEdit from '../components/CategoriesEdit'
import CategoryCreate from '../components/CategoryCreate'
import ItemCreate from '../components/ItemCreate'
import ItemsEditRow from '../components/ItemsEditRow'

export default {
  name: 'Edit',
  metaInfo() {
    return {
      title: this.$title('Редактирование')
    }
  },
  components: {
    CategoriesEdit, CategoryCreate, ItemCreate, ItemsEditRow
  },
  data: () => ({
    categories: [],
    categoriesLoading: true,
    category: null,
    isCategorySelected: false,
    items: [],
    itemsLoading: false,
    isCustom: false
  }),
  methods: {
    addNewCategory(category) {
      this.categories.push(category)
    },
    removeCategory(id) {
      this.categories = this.categories.filter(el => el.id !== id)
    },
    addNewItem(item) {
      this.items.push(item)
    },
    removeItem(id) {
      this.items = this.items.filter(el => el.id !== id)
    },
    async selectHandler() {
      try {
        this.isCategorySelected = true
        this.itemsLoading = true
        this.items = await this.$store.dispatch('fetchItems', this.category)
        this.itemsLoading = false
      } catch(e) {}
    }
  },
  async mounted() {
    try {
      this.categories = await this.$store.dispatch('fetchCategories')
      this.categoriesLoading = false
    } catch(e) {}
  }
}
</script>
