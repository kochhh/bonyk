<template>
  <button
    type="button"
    class="bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 py-2 px-4 font-semibold text-center rounded shadow-sm focus:outline-none focus:ring mb-4 md:mb-6 space-x-2 flex w-full justify-center items-center"
    @click="$router.go(-1)"
  >
    <svg xmlns="http://www.w3.org/2000/svg" width="1rem" height="1rem" fill="currentColor" viewBox="0 0 16 16">
      <path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/>
    </svg>
    <span>Назад</span>
  </button>
</template>
