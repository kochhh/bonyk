<template>
  <div>
    <app-loader v-if="loading" />
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
  data: () => ({
    loading: true
  }),
  components: {
    AppNavbar, AppFooter
  },
  computed: {
    error() {
      return this.$store.getters.error
    }
  },
  watch: {
    error(fbError) {
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
