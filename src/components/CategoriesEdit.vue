<template>
  <div class="ml-auto">
    <button
      type="button"
      class="btn btn-yellow shadow-none py-1 px-3"
      title="Редактировать"
      @click="showModal = true"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" class="w-4 h-4" fill="currentColor" viewBox="0 0 16 16">
        <path d="M4.5 9a3.5 3.5 0 1 0 0 7h7a3.5 3.5 0 1 0 0-7h-7zm7 6a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5zm-7-14a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zm2.45 0A3.49 3.49 0 0 1 8 3.5 3.49 3.49 0 0 1 6.95 6h4.55a2.5 2.5 0 0 0 0-5H6.95zM4.5 0h7a3.5 3.5 0 1 1 0 7h-7a3.5 3.5 0 1 1 0-7z"/>
      </svg>
    </button>
    <t-modal
      v-model="showModal"
      header="Редактировать категории"
      ref="modalCategoriesEdit"
    >
      <draggable
        :list="list"
        animation="200"
        ghost-class="opacity-50"
        @start="dragging = true"
        @end="sortHandler"
      >
        <transition-group
          type="transition"
          :name="!dragging ? 'flip' : null"
          class="flex flex-wrap justify-center -ml-2 -mt-2"
        >
          <div
            v-for="item in list"
            :key="item.id"
            class="ml-2 mt-2 w-24 h-24 p-3 flex flex-col items-center text-center bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-sm cursor-move select-none"
          >
            <button
              type="button"
              class="btn btn-red p-1 shadow-none self-end"
              @click="removeHandler(item.id)"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" class="w-4 h-4" fill="currentColor" viewBox="0 0 16 16">
                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
              </svg>
            </button>
            <span class="font-semibold text-xs mt-auto">
              {{ item.label }}
            </span>
          </div>
        </transition-group>
      </draggable>
      <template v-slot:footer>
        <div class="flex justify-end space-x-8 items-center">
          <button
            type="button"
            class="btn btn-link"
            @click="showModal = false"
          >Отмена</button>
        </div>
      </template>
    </t-modal>
    <app-loader v-if="loading" />
  </div>
</template>

<script>
import draggable from 'vuedraggable'

export default {
  props: {
    categories: {
      type: Array,
      required: true
    }
  },
  components: {
    draggable
  },
  data: () => ({
    showModal: false,
    dragging: false,
    loading: false
  }),
  computed: {
    list: {
      get() {
        return this.categories
      },
      set(obj) {
        this.list = obj
      }
    }
  },
  methods: {
    async sortHandler(evt) {
      try {
        if (evt.newIndex === evt.oldIndex) {
          this.dragging = false
          return
        }
        this.loading = true
        await this.$store.dispatch('updateCategories', this.list)
        this.dragging = this.loading = false
        this.$toast.success('Порядок категорий изменён')
      } catch (e) {}
    },
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

<style scoped>
.flip-move {
  transition: transform 0.5s;
}
.no-move {
  transition: transform 0s;
}
</style>
