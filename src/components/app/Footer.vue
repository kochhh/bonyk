<template>
  <footer class="bg-gray-100 border-t border-gray-200 fixed bottom-0 left-0 w-full">
    <div class="container mx-auto">
      <div class="flex justify-between items-center h-16">
        <span class="font-semibold">
          {{ date | date('datetimesec') }}
        </span>
        <div v-if="isSessionActive" class="ml-auto">
          <span class="block bg-green-500 text-white py-1 px-2 rounded-sm text-xs">
            Started:
            <span class="font-semibold">{{ session.timestart | date('datetime') }}</span>
          </span>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'Footer',
  data: () => ({
    date: new Date(),
    interval: null
  }),
  computed: {
    user() {
      return this.$store.getters.info
    },
    session() {
      return this.$store.getters.session
    },
    isSessionActive() {
      return this.user && this.session && Object.keys(this.session).length > 0 || false
    },
    timestamp() {
      return this.date.getTime()
    }
  },
  mounted() {
    this.interval = setInterval(() => {
      this.date = new Date()
    }, 1000)
  },
  beforeDestroy() {
    clearInterval(this.interval)
  }
}
</script>
