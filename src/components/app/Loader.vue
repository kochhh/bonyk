<template>
  <div
    class="m-auto rounded-full border-2 border-green-500 border-r-transparent animate-spin"
    :class="{ 'h-6 w-6': size === 'sm', 'h-8 w-8': size === '' }"
  ></div>
</template>

<script>
export default {
  name: 'Loader',
  props: {
    size: {
      type: String,
      default: ''
    }
  }
}
</script>
