<template>
  <button
    type="button"
    class="category-button"
    @click="$router.push('/category/' + category.id)"
  >
    <div class="w-full mb-4">
      <base-icon :icon-name="category.name" width="64" height="64" aria-hidden="true" class="w-12 h-12 md:w-16 md:h-16 mx-auto">
        <component :is="'icon-' + category.name" />
      </base-icon>
    </div>
    <div class="w-full md:text-base leading-4 md:leading-5">
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
