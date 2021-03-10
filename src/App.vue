<template>
  <div id="app">
    <div v-if="loading" class="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
      <loader />
    </div>
    <div v-else>
      <app-navbar :session="session" :date="date" :isSessionActive="isSessionActive" @created="startSession" @finalized="stopSession" />
      <main class="py-20">
        <div class="container mx-auto overflow-y-auto py-4">
          <router-view />
        </div>
      </main>
      <app-footer :session="session" :date="date" :isSessionActive="isSessionActive" />
    </div>
  </div>
</template>

<script>
import AppNavbar from '@/components/app/Navbar'
import AppFooter from '@/components/app/Footer'
import messages from '@/utils/messages'

export default {
  data: () => ({
    loading: true,
    date: new Date(),
    interval: null,
    session: {}
  }),
  components: {
    AppNavbar, AppFooter
  },
  computed: {
    error() {
      return this.$store.getters.error
    },
    user() {
      return this.$store.getters.info
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
  methods: {
    startSession(data) {
      this.session = data
      console.log(this.session)
    },
    stopSession() {
      this.session = {}
      console.log(this.session)
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
    this.session = this.$store.getters.session
    this.loading = false
    console.log(this.session)
  },
  beforeDestroy() {
    clearInterval(this.interval)
  }
}
</script>

<style>
html {
  font-size: 12px;
}

@media (min-width: 768px) {
  html {
    font-size: 16px;
  }
}
</style>
