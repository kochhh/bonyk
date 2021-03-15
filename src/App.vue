<template>
  <div id="app">
    <div v-if="loading" class="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
      <loader />
    </div>
    <div v-else>
      <app-navbar />
      <main class="py-20">
        <div class="container mx-auto overflow-y-auto py-4">
          <router-view />
        </div>
      </main>
      <app-footer />
      <app-moneyflow v-if="isSessionActive" />
    </div>
  </div>
</template>

<script>
import AppNavbar from '@/components/app/Navbar'
import AppFooter from '@/components/app/Footer'
import AppMoneyflow from '@/components/app/Moneyflow'
import messages from '@/utils/messages'

export default {
  data: () => ({
    loading: true,
    date: new Date(),
    interval: null
  }),
  components: {
    AppNavbar, AppFooter, AppMoneyflow
  },
  computed: {
    error() {
      return this.$store.getters.error
    },
    user() {
      return this.$store.getters.info
    },
    session() {
      return this.$store.getters.session
    },
    isSessionActive() {
      return this.user && this.session && Object.keys(this.session).length > 0 || false
    }
  },
  watch: {
    error(fbError) {
      this.$toast.error(messages[fbError.code] || 'Что-то пошло не так')
    }
  },
  async mounted() {
    this.interval = setInterval(() => {
      this.date = new Date()
    }, 1000)

    await this.$store.dispatch('fetchInfo')
    if (this.user) {
      await this.$store.dispatch('getActiveSession')
    }
    this.loading = false
  },
  beforeDestroy() {
    clearInterval(this.interval)
  }
}
</script>
