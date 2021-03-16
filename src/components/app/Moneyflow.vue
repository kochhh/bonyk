<template>
  <div class="fixed z-30 bottom-0 h-16 left-1/2 transform -translate-x-1/2 flex items-center space-x-2">
    <div class="flex items-center space-x-2 text-sm font-semibold py-1 px-2 bg-white">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
        <path d="M8 10a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"/>
        <path d="M0 4a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1V4zm3 0a2 2 0 0 1-2 2v4a2 2 0 0 1 2 2h10a2 2 0 0 1 2-2V6a2 2 0 0 1-2-2H3z"/>
      </svg>
      <span>{{ cash }}</span>
    </div>
    <div class="flex items-center space-x-2 text-sm font-semibold py-1 px-2 bg-yellow-50">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
        <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4zm2-1a1 1 0 0 0-1 1v1h14V4a1 1 0 0 0-1-1H2zm13 4H1v5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V7z"/>
        <path d="M2 10a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1v-1z"/>
      </svg>
      <span>{{ card }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Moneyflow',
  computed: {
    ordersBase() {
      return this.$store.getters.session.orders
    },
    ordersState() {
      return this.$store.getters.orders
    },
    cash() {
      const ordersBase = this.ordersBase && Object.keys(this.ordersBase).length > 0 ?
        Object.keys(this.ordersBase)
          .map(key => ({...this.ordersBase[key]}))
          .filter(el => !el.byCard)
          .reduce((acc, cur) => acc + +cur.count * +cur.price, 0) : 0
      const ordersState = this.ordersState && Object.keys(this.ordersState).length > 0 ?
        this.ordersState
          .filter(el => !el.byCard)
          .reduce((acc, cur) => acc + +cur.count * +cur.price, 0) : 0

      return ordersBase + ordersState
    },
    card() {
      const ordersBase = this.ordersBase && Object.keys(this.ordersBase).length > 0 ?
        Object.keys(this.ordersBase)
          .map(key => ({...this.ordersBase[key]}))
          .filter(el => el.byCard)
          .reduce((acc, cur) => acc + +cur.count * +cur.price, 0) : 0
      const ordersState = this.ordersState && Object.keys(this.ordersState).length > 0 ?
        this.ordersState
          .filter(el => el.byCard)
          .reduce((acc, cur) => acc + +cur.count * +cur.price, 0) : 0

      return ordersBase + ordersState
    }
  }
}
</script>
