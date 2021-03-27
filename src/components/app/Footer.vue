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
        <div class="flex items-center space-x-2 md:space-x-4 ml-auto">
          <!-- <div
            class="flex items-center space-x-1 bg-green-500 text-white py-0.5 pl-1.5 pr-2 rounded-sm text-sm"
            v-if="isSession"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" class="w-4 h-4" fill="currentColor" viewBox="0 0 16 16">
              <path d="M11.596 8.697l-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z"/>
            </svg>
            <span class="font-semibold">
              {{ session.timestart | date('time') }}
            </span>
          </div> -->
          <button type="button" class="btn btn-green" v-if="!isSession" @click="startHandler" title="Открыть смену">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" class="w-4 h-4" fill="currentColor" viewBox="0 0 16 16">
              <path d="M12.14 8.753l-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z"/>
            </svg>
          </button>
          <button type="button" class="btn btn-red" v-else-if="isSessionOwn" @click="stopHandler" title="Закрыть смену">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" class="w-4 h-4" fill="currentColor" viewBox="0 0 16 16">
              <path d="M5 3.5h6A1.5 1.5 0 0 1 12.5 5v6a1.5 1.5 0 0 1-1.5 1.5H5A1.5 1.5 0 0 1 3.5 11V5A1.5 1.5 0 0 1 5 3.5z"/>
            </svg>
          </button>
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
    loading: false,
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
    },
    timestamp() {
      return this.date.getTime()
    }
  },
  methods: {
    async startHandler() {
      const res = await this.$dialog.prompt({
        title: 'Открыть смену?',
        inputPlaceholder: 'Введите название мероприятия (необязательно)',
        icon: 'info',
        cancelButtonText: 'Отмена'
      })
      if (res.isOk) {
        this.loading = true
        await this.$store.dispatch('createSession', {
          timestart: this.timestamp,
          event: res.input.length ? res.input : 'Без названия'
        })
        this.loading = false
        if (this.$route.name !== 'Home') {
          this.$router.push('/')
        }
        this.$toast.success('Вы открыли смену')
      }
    },
    async stopHandler() {
      const res = await this.$dialog.confirm({
        title: 'Закрыть смену?',
        icon: 'info',
        cancelButtonText: 'Отмена'
      })
      if (res.isOk) {
        this.loading = true
        await this.$store.dispatch('finalizeSession', {
          sid: this.session.id,
          timeend: this.timestamp
        })
        this.loading = false
        if (this.$route.name !== 'Home') {
          this.$router.push('/')
        }
        this.$toast.default('Вы закрыли смену')
      }
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
