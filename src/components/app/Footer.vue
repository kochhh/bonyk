<template>
  <footer class="bg-gray-100 border-t border-gray-200 fixed bottom-0 left-0 w-full">
    <div class="container mx-auto">
      <div class="flex justify-between items-center h-16">
        <span class="font-semibold">
          {{ date | date('datetime') }}
        </span>
        <div v-if="isSessionActive" class="ml-auto">
          <!-- <span class="mr-4 text-xs">
            {{ session.id }}
          </span> -->
          <span class="bg-green-500 text-white py-1 px-2 rounded-sm text-xs">
            Смена открыта: {{ session.timestart | date('datetime') }}
          </span>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'Footer',
  props: {
    session: {
      type: Object,
      required: true
    },
    date: {
      type: Date,
      required: true
    },
    isSessionActive: {
      type: Boolean,
      required: true
    }
  }
}
</script>
