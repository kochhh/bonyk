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
        <table class="min-w-full shadow-sm border border-gray-200 dark:border-gray-700 mb-8 text-sm">
          <thead>
            <tr>
              <th class="px-3 py-2 font-semibold text-left bg-gray-100 dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700 w-12">
                Вкл?
              </th>
              <th class="px-3 py-2 font-semibold text-left bg-gray-100 dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700">
                Название
              </th>
              <th class="px-3 py-2 font-semibold text-left bg-gray-100 dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700 w-20">
                Цена
              </th>
              <th class="px-3 py-2 font-semibold text-left bg-gray-100 dark:bg-gray-800 border-b border-gray-100 dark:border-gray-700 w-24">
                Действия
              </th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-100 dark:divide-gray-700">
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
    isCategorySelected: false,
    category: null,
    items: [],
    itemsLoading: false,
    isCustom: false
  }),
  methods: {
    addNewCategory(item) {
      this.categories.push(item)
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
      if (this.$route.query.cid) {
        this.category = this.$route.query.cid
        this.selectHandler()
      }
      this.categories = (await this.$store.dispatch('fetchCategories'))
        .sort((a, b) => a.order - b.order)
      this.categoriesLoading = false
    } catch(e) {}
  }
}
</script>
