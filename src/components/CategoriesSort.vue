<template>
  <div>
    <button
      type="button"
      class="btn btn-blue shadow-none py-1 px-3"
      title="Сортировать"
      @click="showModal = true"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-sort-down" viewBox="0 0 16 16">
        <path d="M3.5 2.5a.5.5 0 0 0-1 0v8.793l-1.146-1.147a.5.5 0 0 0-.708.708l2 1.999.007.007a.497.497 0 0 0 .7-.006l2-2a.5.5 0 0 0-.707-.708L3.5 11.293V2.5zm3.5 1a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zM7.5 6a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1h-5zm0 3a.5.5 0 0 0 0 1h3a.5.5 0 0 0 0-1h-3zm0 3a.5.5 0 0 0 0 1h1a.5.5 0 0 0 0-1h-1z"/>
      </svg>
    </button>
    <t-modal-form
      v-model="showModal"
      header="Сортировать категории"
      ref="modalSort"
    >
      <form @submit.prevent="submitHandler">
        <div class="p-4">
          <draggable
            tag="div"
            v-model="categories"
            animation="200"
            ghost-class="opacity-30"
            drag-class="shadow-sm"
            @start="dragStart"
            @end="dragEnd"
          >
            <transition-group type="transition" tag="ul" class="flex flex-wrap justify-center -ml-1 -mt-1">
              <li
                v-for="item in categories"
                :key="item.id"
                class="ml-1 mt-1 w-24 h-20 p-2 flex flex-col justify-center items-center text-center bg-gray-100 border border-gray-200 text-xs rounded-sm cursor-move"
              >
                {{ item.label }}
              </li>
            </transition-group>
          </draggable>
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
            >Сохранить</button>
          </div>
        </div>
      </form>
    </t-modal-form>
  </div>
</template>

<script>
import draggable from 'vuedraggable'

export default {
  data: () => ({
    showModal: false,
    dragging: false
  }),
  props: {
    categories: {
      type: Array,
      required: true
    }
  },
  components: {
    draggable
  },
  // computed: {
  //   categories: {
  //     get() {
  //       return this.$store.getters.categories
  //     },
  //     set(value) {
  //       this.$store.commit('updateCategories', value)
  //     }
  //   }
  // },
  methods: {
    dragStart() {
      this.dragging = true
    },
    dragEnd() {
      this.dragging = false
    },
    async submitHandler() {
      try {
        // await this.$store.dispatch('updateCategories', sorted)
        // this.$emit('sorted', categories)
        // this.$refs.modalSort.hide()
        // this.$toast.success('Категории успешно отсортированы')
      } catch (e) {}
    }
  }
}
</script>
