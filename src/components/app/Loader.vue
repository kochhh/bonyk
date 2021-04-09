<template>
  <div class="fixed z-50 left-0 top-0 right-0 bottom-0 bg-white dark:bg-black bg-opacity-50 dark:bg-opacity-50">
    <div class="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
      <div class="h-8 w-8 rounded-full border-2 border-green-500 border-r-transparent animate-spin select-none"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Loader'
}
</script>
