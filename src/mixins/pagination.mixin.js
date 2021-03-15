import { chunk } from 'lodash'

export default {
  data() {
    return {
      page: +this.$route.query.page || 1,
      pageSize: 10,
      pageCount: 0,
      allItems: [],
      items: []
    }
  },
  methods: {
    pageChangeHandler(page) {
      this.$router.push({ query: { page } })
      this.items = this.allItems[page - 1] || this.allItems[0]
    },
    setupPagination(allItems) {
      this.allItems = chunk(allItems, this.pageSize)
      this.pageCount = allItems.length
      this.items = this.allItems[this.page - 1] || this.allItems[0]
    }
  }
}
