<template>
  <div>
    <app-loader v-if="loading" />
    <div v-else-if="isForbidden">
      <main class="py-20 md:py-24 min-h-screen flex flex-col">
        <div class="container m-auto">
          <h1 class="my-auto text-xl text-center font-mono font-semibold">maintenance mode</h1>
        </div>
      </main>
    </div>
    <div v-else>
      <app-navbar />
      <main class="py-20 md:py-24">
        <div class="container mx-auto">
          <router-view />
        </div>
      </main>
      <app-footer />
    </div>
  </div>
</template>

<script>
import AppNavbar from '@/components/app/Navbar'
import AppFooter from '@/components/app/Footer'
import messages from '@/utils/messages'

export default {
  components: {
    AppNavbar, AppFooter
  },
  data: () => ({
    loading: true
  }),
  computed: {
    error() {
      return this.$store.getters.error
    },
    isForbidden() {
      return this.$store.getters.error && this.$store.getters.error.code === 'PERMISSION_DENIED'
    }
  },
  watch: {
    error(fbError) {
      this.loading = false
      this.$toast.error(messages[fbError.code] || 'Что-то пошло не так')
    }
  },
  async mounted() {
    if (!this.$store.getters.info.name) {
      await this.$store.dispatch('fetchInfo')
    }

    if (this.$store.getters.info.name && !this.$store.getters.session.id) {
      await this.$store.dispatch('getActiveSession')
    }

    this.loading = false
  }
}
</script>
