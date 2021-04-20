<template>
  <tr>
    <td class="px-3 py-2" :colspan="item.isCustom && 2">
      {{ item.label }}
    </td>
    <td class="px-3 py-2 whitespace-nowrap" v-if="!item.isCustom">
      {{ item.price }}
    </td>
    <td class="px-3 py-2 whitespace-nowrap">
      <div class="flex space-x-2">
        <item-edit :category="category" :item="item" @edited="editItem" />
        <button type="button" class="btn btn-red py-1 px-3 shadow-none" @click="removeHandler" title="Удалить">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" class="w-4 h-4" fill="currentColor" viewBox="0 0 16 16">
            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
            <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
          </svg>
        </button>
      </div>
    </td>
    <td class="px-3 py-2 whitespace-nowrap">
      <input
        type="checkbox"
        name="items"
        class="checkbox -mt-0.5"
        :id="item.id"
        :ref="item.id"
        :checked="item.enabled"
        @change="checkboxHandler"
      >
    </td>
  </tr>
</template>

<script>
import ItemEdit from '@/components/ItemEdit'

export default {
  props: {
    category: {
      type: String,
      required: true
    },
    item: {
      type: Object,
      required: true
    }
  },
  components: {
    ItemEdit
  },
  data: () => ({
    enabled: true
  }),
  methods: {
    async checkboxHandler() {
      try {
        await this.$store.dispatch('updateEnabledItems', {
          id: this.item.id,
          enabled: this.$refs[this.item.id].checked,
          cid: this.category
        })
        this.$toast.success('Список позиций обновлён')
      } catch(e) {}
    },
    async removeHandler() {
      const res = await this.$dialog.confirm({
        title: 'Удалить позицию?',
        icon: 'warning',
        cancelButtonText: 'Отмена'
      })
      if (res.isOk) {
        try {
          await this.$store.dispatch('removeItem', {
            id: this.item.id,
            cid: this.category
          })
          this.$emit('removed', this.item.id)
          this.$toast.success('Позиция удалена')
        } catch(e) {}
      }
    },
    editItem(label, price) {
      this.item.label = label
      this.item.price = price
    }
  }
}
</script>
