<template>
  <tr>
    <td class="px-3 py-2 whitespace-nowrap">
      {{ item.number }}
    </td>
    <td class="px-3 py-2 whitespace-nowrap">
      <router-link :to="{ name: 'Session', params: { id: item.id, timestart: item.timestart } }" class="link">
        {{ item.timestart | date('datetime') }}
      </router-link>
    </td>
    <td class="px-3 py-2 whitespace-nowrap">
      {{ item.timeend | date('datetime') }}
    </td>
    <td class="px-3 py-2 whitespace-nowrap">
      {{ item.name || '?' }}
    </td>
    <td class="px-3 py-2 whitespace-nowrap">
      <div class="flex items-center">
        <button
          type="button"
          class="btn btn-green py-1 px-2 shadow-none"
          :class="{ 'disabled:opacity-50 disabled:cursor-not-allowed': isSession }"
          :disabled="isSession"
          v-if="isSessionResumable"
          @click="resumeHandler"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width=".625rem" height=".625rem" fill="currentColor" viewBox="0 0 16 16">
            <path d="M12.14 8.753l-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z"/>
          </svg>
        </button>
        <app-loader v-if="loading" />
      </div>
    </td>
  </tr>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  data: () => ({
    loading: false,
    timestamp: new Date().getTime()
  }),
  computed: {
    isSession() {
      return Object.keys(this.$store.getters.session).length > 0
    },
    isSessionResumable() {
      return this.timestamp - this.item.timestart < 24 * 60 * 60 * 1000
    }
  },
  methods: {
    async resumeHandler() {
      const res = await this.$dialog.confirm({
        title: 'Продолжить смену?',
        icon: 'info',
        cancelButtonText: 'Отмена'
      })
      if (res.isOk) {
        this.loading = true
        await this.$store.dispatch('resumeSession', this.item.id)
        this.loading = false
        if (this.$route.name !== 'Home') {
          this.$router.push('/')
        }
        this.$toast.default('Вы возобновили смену')
      }
    }
  },
  mounted() {
    this.interval = setInterval(() => {
      this.timestamp = new Date().getTime()
    }, 1000)
  },
  beforeDestroy() {
    clearInterval(this.interval)
  }
}
</script>
