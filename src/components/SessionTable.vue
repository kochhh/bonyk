<template>
  <table class="min-w-full divide-y divide-gray-100 shadow-sm border border-gray-200 mb-8 text-sm">
    <thead>
      <tr>
        <th class="px-3 py-3 font-semibold text-left bg-gray-100 border-b align-top w-12">
          №
        </th>
        <th class="px-3 py-3 font-semibold text-left bg-gray-100 border-b align-top w-24">
          Категория
        </th>
        <th class="px-3 py-3 font-semibold text-left bg-gray-100 border-b align-top">
          Позиция
        </th>
        <th class="px-3 py-3 font-semibold text-right bg-gray-100 border-b align-top w-20">
          Цена
        </th>
        <th class="px-3 py-3 font-semibold text-right bg-gray-100 border-b align-top w-20">
          Кол-во
        </th>
        <th class="px-3 py-3 font-semibold text-right bg-gray-100 border-b align-top w-20">
          Всего
        </th>
        <th class="px-3 py-3 bg-gray-100 border-b w-12">
        </th>
      </tr>
    </thead>
    <tbody class="divide-y divide-gray-100">
      <tr v-for="item in items" :key="item.id">
        <td class="px-3 py-2 whitespace-nowrap align-top">
          {{ item.number }}
        </td>
        <td class="px-3 py-2 align-top">
          <span class="inline-block overflow-ellipsis whitespace-nowrap w-24 overflow-hidden">{{ item.category || '-' }}</span>
        </td>
        <td class="px-3 py-2 align-top">
          {{ item.label }}
        </td>
        <td class="px-3 py-2 whitespace-nowrap text-right align-top">
          {{ item.price }} ₴
        </td>
        <td class="px-3 py-2 whitespace-nowrap text-right align-top">
          {{ item.count }}
        </td>
        <td class="px-3 py-2 whitespace-nowrap text-right align-top">
          {{ item.price * item.count }} ₴
        </td>
        <td class="px-3 py-2 whitespace-nowrap text-center align-top">
          <svg v-if="item.byCard" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-credit-card inline -mt-0.5" viewBox="0 0 16 16">
            <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4zm2-1a1 1 0 0 0-1 1v1h14V4a1 1 0 0 0-1-1H2zm13 4H1v5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V7z"/>
            <path d="M2 10a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1v-1z"/>
          </svg>
        </td>
      </tr>
    </tbody>
    <tfoot>
      <tr>
        <td class="px-3 py-3 text-right bg-gray-100 border-t" colspan="6">
          <div class="mb-2 pb-2 border-b border-gray-200">
            Нал: <span class="font-bold ml-1">{{ this.totalCash }} ₴</span>
            <br>
            Безнал: <span class="font-bold ml-1">{{ this.totalCard }} ₴</span>
          </div>
          <div>
            Итого: <span class="text-lg font-bold ml-1">{{ this.total }} ₴</span>
          </div>
        </td>
        <td class="px-3 py-3 bg-gray-100 border-t">
        </td>
      </tr>
    </tfoot>
  </table>
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      required: true
    },
    totalItems: {
      type: Array,
      required: true
    }
  },
  computed: {
    totalCash() {
      return this.totalItems
        .filter(el => !el.byCard)
        .reduce((acc, cur) => acc + +cur.count * +cur.price, 0) || 0
    },
    totalCard() {
      return this.totalItems
        .filter(el => el.byCard)
        .reduce((acc, cur) => acc + +cur.count * +cur.price, 0) || 0
    },
    total() {
      return this.totalCash + this.totalCard
    }
  }
}
</script>
