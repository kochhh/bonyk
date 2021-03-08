<template>
  <div class="w-40 h-40 bg-gray-100 border border-gray-300 rounded-sm justify-center items-center text-center cursor-pointer ml-1 mb-1">
    <div class="flex flex-col py-5 px-4 h-full" v-if="!clicked" @click="clickHandler">
      <div class="w-full mb-4 flex-grow">
        <span class="text-lg font-semibold">{{ item.label }}</span>
      </div>
      <div class="w-full mt-auto">
        <span class="text-3xl font-semibold">{{ item.price }}</span>
      </div>
    </div>
    <div class="flex flex-col py-5 px-4 h-full" v-else>
      <div class="w-full mb-4 flex-grow">
        <numeric-input v-model="count" :min="1" :max="10" :step="1" />
      </div>
      <div class="w-full mt-auto">
        <button type="button" class="btn btn-green px-3 py-2" @click="okHandler">
          <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" class="bi bi-check" viewBox="0 0 16 16">
            <path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z"/>
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import NumericInput from '@/components/NumericInput'

export default {
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  data: () => ({
    clicked: false,
    count: 1,
    date: new Date(),
    interval: null
  }),
  components: {
    NumericInput
  },
  methods: {
    clickHandler() {
      if (this.session && Object.keys(this.session).length > 0) {
        this.clicked = true
      } else {
        this.$toast.default('Смена не открыта')
      }
    },
    async okHandler() {
      const activeSid = this.$store.getters.session.key
      const { id, label, price } = this.item
      const count = this.count
      const time = this.timestamp
      await this.$store.dispatch('addOrder', { activeSid, id, label, price, count, time })
      this.clicked = false
      this.$router.push('/?message=added')
    }
  },
  computed: {
    timestamp() {
      return this.date.getTime()
    },
    session() {
      return this.$store.getters.session
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
