<template>
  <tr>
    <td class="px-3 py-2 whitespace-nowrap">
      {{ index + 1 }}
    </td>
    <td class="px-3 py-2 whitespace-nowrap">
      <router-link :to="{ name: 'Session', params: { id: item.id } }" class="link">
        <span v-if="item.timestart">{{ item.timestart | date('date') }}</span>
        <span v-else>-</span>
      </router-link>
    </td>
    <td class="px-3 py-2 whitespace-nowrap">
      <span v-if="item.timestart">{{ item.timestart | date('time') }}</span>
      <span v-else>-</span>
    </td>
    <td class="px-3 py-2 whitespace-nowrap">
      {{ item.name || '-' }}
    </td>
    <!-- <td class="px-3 py-2">
      <button type="button" class="btn btn-green py-1 px-2 shadow-none" v-if="isSessionResumable" @click="resumeHandler">
        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" fill="currentColor" class="bi bi-caret-right-fill" viewBox="0 0 16 16">
          <path d="M12.14 8.753l-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z"/>
        </svg>
      </button>
    </td> -->
  </tr>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      required: true
    },
    index: {
      type: Number,
      required: true,
      default: 0
    }
  },
  data: () => ({
    time: Date.now(),
    loading: false
  }),
  // computed: {
  //   isSessionResumable() {
  //     return this.time - this.item.timestart < 24 * 60 * 60 * 60
  //   }
  // },
  // methods: {
  //   async resumeHandler() {
  //     const res = await this.$dialog.confirm({
  //       title: 'Продолжить смену?',
  //       icon: 'info',
  //       cancelButtonText: 'Отмена'
  //     })
  //     if (res.isOk) {
  //       this.loading = true
  //       await this.$store.dispatch('resumeSession', this.item.id)
  //       this.loading = false
  //       this.$toast.default('Вы возобновили смену')
  //     }
  //   }
  // }
}
</script>
