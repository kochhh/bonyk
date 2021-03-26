<template>
  <footer class="bg-gray-100 dark:bg-gray-800 border-t border-gray-300 dark:border-gray-700 fixed bottom-0 left-0 w-full z-20">
    <div class="container mx-auto">
      <div class="flex items-center h-14 md:h-16">
        <div class="font-semibold text-sm">
          <span :class="{ 'hidden md:inline': isSession }">
            {{ date | date('date') }}
          </span>
          <span>
            {{ date | date('timesec') }}
          </span>
        </div>
        <moneyflow v-if="isSession && isSessionOwn" />
        <div v-if="isSession" class="ml-auto">
          <span class="flex items-center space-x-1 bg-green-500 text-white py-1 pl-1.5 pr-2 rounded-sm text-sm">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" class="w-4 h-4" fill="currentColor" viewBox="0 0 16 16">
              <path d="M11.596 8.697l-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z"/>
            </svg>
            <span class="font-semibold">
              <span class="hidden md:inline">
                {{ session.timestart | date('date') }}
              </span>
              <span>
                {{ session.timestart | date('time') }}
              </span>
            </span>
          </span>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
import Moneyflow from '@/components/app/Moneyflow'

export default {
  name: 'Footer',
  data: () => ({
    date: new Date(),
    interval: null
  }),
  components: {
    Moneyflow
  },
  computed: {
    isSession() {
      return Object.keys(this.$store.getters.session).length > 0
    },
    session() {
      return this.$store.getters.session
    },
    isSessionOwn() {
      return this.$store.getters.info.uid === this.$store.getters.session.uid
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
