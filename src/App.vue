<template>
  <div id="app">
    <component :is="layout">
      <router-view />
    </component>
  </div>
</template>

<script>
import MainLayout from '@/layouts/MainLayout'
import EmptyLayout from '@/layouts/EmptyLayout'

export default {
  components: {
    EmptyLayout, MainLayout
  },
  computed: {
    layout() {
      return (this.$route.meta.layout || 'empty') + '-layout'
    },
    theme() {
      return this.$store.getters.theme
    }
  },
  watch: {
    theme(newTheme) {
      document.documentElement.classList.toggle('dark', newTheme === 'dark')
    }
  },
  beforeMount() {
    this.$store.dispatch('initTheme')
  }
}
</script>
