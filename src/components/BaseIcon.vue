<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    :class="'icon icon-' + iconName"
    :width="width"
    :height="height"
    :viewBox="'0 0 512 512'"
    :aria-labelledby="'icon-' + iconName"
    role="img"
    focusable="false"
  >
    <slot />
  </svg>
</template>

<script>
export default {
  name: 'BaseIcon',
  props: {
    iconName: {
      type: String,
      default: 'box'
    },
    width: {
      type: [Number, String],
      default: 512
    },
    height: {
      type: [Number, String],
      default: 512
    },
    iconColor: {
      type: String,
      default: 'currentColor'
    }
  }
}
</script>
