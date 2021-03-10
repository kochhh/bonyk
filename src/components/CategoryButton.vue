<template>
  <router-link
    :to="{ name: 'Category', params: { catId: category.id } }"
    class="w-40 h-40 p-4 bg-gray-100 border border-gray-300 focus:outline-none focus:ring transition rounded-sm flex flex-col justify-center text-center ml-1 mb-1"
  >
    <div class="w-full flex flex-col justify-end items-center h-16 mb-6">
      <base-icon :icon-name="category.name" width="64" height="64" aria-hidden="true" class="max-h-full">
        <component :is="'icon-' + category.name" />
      </base-icon>
    </div>
    <div class="w-full">
      <span class="text-lg font-semibold">{{ category.label }}</span>
    </div>
  </router-link>
</template>

<script>
import BaseIcon from '../components/BaseIcon'
import IconBeer from '../components/icons/IconBeer'
import IconCocktail from '../components/icons/IconCocktail'
import IconVodka from '../components/icons/IconVodka'
import IconCognac from '../components/icons/IconCognac'
import IconTequila from '../components/icons/IconTequila'
import IconWhiskey from '../components/icons/IconWhiskey'
import IconWine from '../components/icons/IconWine'
import IconCoffee from '../components/icons/IconCoffee'
import IconTea from '../components/icons/IconTea'
import IconWater from '../components/icons/IconWater'
import IconFood from '../components/icons/IconFood'

export default {
  props: {
    category: {
      type: Object,
      required: true
    }
  },
  components: {
    BaseIcon, IconBeer, IconCocktail, IconVodka, IconCognac, IconTequila, IconWhiskey, IconWine, IconCoffee, IconTea, IconWater, IconFood
  },
}
</script>
