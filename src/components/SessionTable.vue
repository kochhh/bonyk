<template>
  <table class="min-w-full divide-y divide-gray-100 shadow-sm border border-gray-200 mb-8 text-xs md:text-sm">
    <thead>
      <tr>
        <th class="px-3 py-2 font-semibold text-left bg-gray-100 border-b align-top w-10">
          №
        </th>
        <!-- <th class="px-3 py-2 font-semibold text-left bg-gray-100 border-b align-top w-16">
          Категория
        </th> -->
        <th class="px-3 py-2 font-semibold text-left bg-gray-100 border-b align-top">
          Позиция
        </th>
        <th class="px-3 py-2 font-semibold text-right bg-gray-100 border-b align-top w-20">
          Цена
        </th>
        <th class="px-3 py-2 font-semibold text-right bg-gray-100 border-b align-top w-20">
          Кол-во
        </th>
        <th class="px-3 py-2 font-semibold text-right bg-gray-100 border-b align-top w-20">
          Всего
        </th>
      </tr>
    </thead>
    <tbody class="divide-y divide-gray-100">
      <tr v-for="item in items" :key="item.id">
        <td class="px-3 py-2 whitespace-nowrap align-top" :class="{ 'bg-yellow-50': item.byCard }">
          {{ item.number }}
        </td>
        <!-- <td class="px-3 py-2 align-top" :class="{ 'bg-yellow-50': item.byCard }">
          <div class="w-16 overflow-ellipsis whitespace-nowrap overflow-hidden">
            {{ item.category || '-' }}
          </div>
        </td> -->
        <td class="px-3 py-2 align-top" :class="{ 'bg-yellow-50': item.byCard }">
          {{ item.label }}
        </td>
        <td class="px-3 py-2 whitespace-nowrap text-right align-top" :class="{ 'bg-yellow-50': item.byCard }">
          {{ item.price }} ₴
        </td>
        <td class="px-3 py-2 whitespace-nowrap text-right align-top" :class="{ 'bg-yellow-50': item.byCard }">
          {{ item.count }}
        </td>
        <td class="px-3 py-2 whitespace-nowrap text-right align-top" :class="{ 'bg-yellow-50': item.byCard }">
          {{ item.price * item.count }} ₴
        </td>
      </tr>
    </tbody>
    <tfoot>
      <tr>
        <td class="px-3 py-2 text-right bg-gray-100 border-t" colspan="5">
          <div class="mb-2 pb-2 border-b border-gray-200 flex justify-end">
            <span class="py-1 px-2 bg-white">
              Cash: <span class="font-bold ml-1">{{ this.totalCash }} ₴</span>
            </span>
            <span class="py-1 px-2 bg-yellow-50 ml-2">
              Card: <span class="font-bold ml-1">{{ this.totalCard }} ₴</span>
            </span>
          </div>
          <div>
            Итого: <span class="text-lg font-bold ml-1">{{ this.total }} ₴</span>
          </div>
        </td>
        <!-- <td class="px-3 py-3 bg-gray-100 border-t">
        </td> -->
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
