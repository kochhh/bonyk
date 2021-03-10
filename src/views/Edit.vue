<template>
  <div>
    <div class="flex items-baseline mb-4">
      <h2>Выберите категорию</h2>
      <category-create @created="addNewCategory" />
    </div>
    <div class="mb-8">
      <loader v-if="categoriesLoading" />
      <select v-else
        class="form-control"
        v-model="category"
        @change="selectHandler"
      >
        <option selected :value="null" disabled>Выберите...</option>
        <option
          v-for="c in cateroriesByAlphabet"
          :key="c.id"
          :value="c.id"
        >{{ c.label }}</option>
      </select>
    </div>
    <div v-if="isCategorySelected">
      <div class="flex items-baseline mb-4">
        <h2>Позиции</h2>
        <item-create :category="category" @created="addNewItem" />
      </div>
      <loader v-if="itemsLoading" />
      <table
        v-else-if="items.length"
        class="min-w-full divide-y divide-gray-100 shadow-sm border border-gray-200 mb-8"
      >
        <thead>
          <tr>
            <th class="px-3 py-2 font-semibold text-left bg-gray-100 border-b w-16">Вкл?</th>
            <th class="px-3 py-2 font-semibold text-left bg-gray-100 border-b">Название</th>
            <th class="px-3 py-2 font-semibold text-left bg-gray-100 border-b w-24">Цена</th>
            <th class="px-3 py-2 font-semibold text-left bg-gray-100 border-b w-40">Действия</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-100">
          <items-edit-row
            v-for="item in items"
            :key="item.id"
            :category="category"
            :items="items"
            :id="item.id"
            :label="item.label"
            :price="item.price"
            :enabled="item.enabled"
            @deleted="removeItem"
          />
        </tbody>
      </table>
      <div v-else class="mb-8">
        В данной категории позиций пока нет.
      </div>
    </div>
  </div>
</template>

<script>
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
    CategoryCreate, ItemCreate, ItemsEditRow
  },
  data: () => ({
    categories: [],
    categoriesLoading: true,
    category: null,
    isCategorySelected: false,
    items: [],
    itemsLoading: true,
    itemsChanged: false
  }),
  watch: {
    category(catId) {
      return catId
    }
  },
  computed: {
    cateroriesByAlphabet() {
      const categories = this.categories
      return categories.sort((a, b) => a.label.localeCompare(b.label))
    }
  },
  methods: {
    addNewCategory(cat) {
      this.categories.push(cat)
    },
    addNewItem(item) {
      this.items.push(item)
    },
    removeItem(item) {
      this.items = this.items.filter(el => el.id !== item.id)
    },
    async selectHandler() {
      try {
        this.isCategorySelected = true
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
