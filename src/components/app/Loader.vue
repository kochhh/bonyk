<template>
  <div class="fixed z-50 left-0 top-0 right-0 bottom-0 bg-white dark:bg-black bg-opacity-60 dark:bg-opacity-60" v-if="solid">
    <div class="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
      <div
        class="rounded-full border-2 border-green-500 border-r-transparent animate-spin"
        :class="{ 'h-6 w-6': small === true, 'h-8 w-8': small === false }"
      ></div>
    </div>
  </div>
  <div
    class="rounded-full border-2 border-green-500 border-r-transparent animate-spin"
    :class="{ 'h-6 w-6': small === true, 'h-8 w-8': small === false }"
    v-else
  ></div>
</template>

<script>
export default {
  name: 'Loader',
  props: {
    solid: {
      type: Boolean,
      default: true
    },
    small: {
      type: Boolean,
      default: false
    }
  }
}
</script>
