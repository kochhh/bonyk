<template>
  <button
    type="button"
    class="w-28 md:w-40 h-28 md:h-36 ml-2 mt-2 py-2 px-2 md:px-4 flex flex-col justify-center items-center bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring rounded-sm font-semibold text-center"
    @click="$router.push('/category/' + category.id)"
  >
    <div class="w-full flex-shrink-0 mb-4">
      <base-icon :icon-name="category.name" width="64" height="64" aria-hidden="true" class="w-12 h-12 md:w-16 md:h-16 mx-auto">
        <component :is="'icon-' + category.name" />
      </base-icon>
    </div>
    <div class="w-full flex-shrink-0 leading-4 md:leading-5 text-sm md:text-base">
      {{ category.label }}
    </div>
  </button>
</template>

<script>
import BaseIcon from '../components/BaseIcon'
import IconBeer from '../components/icons/IconBeer'
import IconLong from '../components/icons/IconLong'
import IconShot from '../components/icons/IconShot'
import IconStrong from '../components/icons/IconStrong'
import IconVodka from '../components/icons/IconVodka'
import IconTequila from '../components/icons/IconTequila'
import IconWhiskey from '../components/icons/IconWhiskey'
import IconCognac from '../components/icons/IconCognac'
import IconWine from '../components/icons/IconWine'
import IconHot from '../components/icons/IconHot'
import IconCold from '../components/icons/IconCold'
import IconCoffee from '../components/icons/IconCoffee'
import IconFood from '../components/icons/IconFood'

export default {
  props: {
    category: {
      type: Object,
      required: true
    }
  },
  components: {
    BaseIcon,
    IconBeer,
    IconLong,
    IconShot,
    IconStrong,
    IconVodka,
    IconTequila,
    IconWhiskey,
    IconCognac,
    IconWine,
    IconHot,
    IconCold,
    IconCoffee,
    IconFood
  }
}
</script>
