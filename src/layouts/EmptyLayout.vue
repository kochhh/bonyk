<template>
  <div>
    <header class="bg-gray-100 dark:bg-gray-800 border-b border-gray-300 dark:border-gray-700 fixed top-0 left-0 w-full z-20">
      <div class="container mx-auto">
        <nav class="flex justify-center items-center space-x-4 h-14 md:h-16">
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" class="w-8 h-8" viewBox="0 0 512 512">
            <g fill="none">
              <circle cx="256" cy="256" r="256" fill="#4C4C4C"/>
              <path fill="#232323" d="M200.49,353.325 L343.736,496.57 C441.908,460.757 512,366.564 512,256 C512,247.042 511.54,238.192 510.642,229.472 L359.24,78.07 L200.49,353.325 Z"/>
              <polygon fill="#FFF7E1" points="359.241 78.066 352.981 182.989 232.39 230.034 111.8 182.989 105.54 78.066"/>
              <polygon fill="#FFD997" points="359.24 78.07 352.98 182.99 232.39 230.03 232.39 78.07"/>
              <path fill="#FFB624" d="M352.981,182.989 L348.84,252.484 L344.414,259.74 C336.635,272.494 332.009,286.92 330.922,301.821 L321.225,434.679 L143.556,434.679 L133.858,301.805 C132.771,286.915 128.152,272.499 120.382,259.751 L115.953,252.485 L111.8,182.989 L352.981,182.989 L352.981,182.989 Z"/>
              <path fill="#F27E16" d="M352.98,182.99 L348.84,252.48 L344.41,259.74 C336.63,272.5 332.01,286.92 330.92,301.82 L321.22,434.68 L232.39,434.68 L232.39,182.99 L352.98,182.99 Z"/>
              <g transform="translate(267 256)">
                <path fill="#00A08D" d="M170.731,43.817 C170.731,43.817 16.957,38.005 54.225,178.68 C198.817,195.158 170.731,43.817 170.731,43.817 Z"/>
                <path fill="#64E2B1" d="M54.225,178.68 C-65.955,96.61 54.225,0.44 54.225,0.44 C54.225,0.44 174.405,96.61 54.225,178.68 Z"/>
              </g>
              <path fill="#1AC695" d="M321.225,434.68 L321.225,256.44 C321.225,256.44 441.405,352.61 321.225,434.68 Z"/>
            </g>
          </svg>
          <!-- <router-link :to="'/register'" class="btn btn-white" title="Регистрация">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" class="w-4 h-4" fill="currentColor" viewBox="0 0 16 16">
              <path d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H1s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C9.516 10.68 8.289 10 6 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z"/>
              <path fill-rule="evenodd" d="M13.5 5a.5.5 0 0 1 .5.5V7h1.5a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0V8h-1.5a.5.5 0 0 1 0-1H13V5.5a.5.5 0 0 1 .5-.5z"/>
            </svg>
          </router-link> -->
          <!-- <router-link :to="'/login'" class="btn btn-green" title="Войти">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" class="w-4 h-4" fill="currentColor" viewBox="0 0 16 16">
              <path fill-rule="evenodd" d="M10 3.5a.5.5 0 0 0-.5-.5h-8a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-2a.5.5 0 0 1 1 0v2A1.5 1.5 0 0 1 9.5 14h-8A1.5 1.5 0 0 1 0 12.5v-9A1.5 1.5 0 0 1 1.5 2h8A1.5 1.5 0 0 1 11 3.5v2a.5.5 0 0 1-1 0v-2z"/>
              <path fill-rule="evenodd" d="M4.146 8.354a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H14.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3z"/>
            </svg>
          </router-link> -->
        </nav>
      </div>
    </header>
    <main class="py-20 md:py-24">
      <div class="container mx-auto">
        <router-view />
      </div>
    </main>
  </div>
</template>

<script>
import messages from '@/utils/messages'

export default {
  computed: {
    error() {
      return this.$store.getters.error
    }
  },
  watch: {
    error(fbError) {
      this.$toast.error(messages[fbError.code] || 'Что-то пошло не так')
    }
  }
}
</script>
