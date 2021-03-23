const colors = require('tailwindcss/colors')
const flattenColorPalette = require('tailwindcss/lib/util/flattenColorPalette').default

module.exports = {
  purge: {
    content: [
      './public/**/*.html',
      './src/**/*.vue',
      './src/utils/components.js'
    ],
    whitelistPatterns: [
      /-(leave|enter|appear)(|-(to|from|active))$/,
      /^(?!cursor-move).+-move$/,
      /^router-link(|-exact)-active$/
    ]
  },
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    colors: {
      ...colors,
      gray: colors.trueGray,
      green: colors.emerald,
      transparent: 'transparent',
      current: 'currentColor'
    },
    screens: {
      'sm': '576px',
      'md': '768px',
      'lg': '992px'
    },
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        sm: '2rem'
      }
    }
  },
  variants: {
    extend: {
      backgroundColor: ['checked'],
      borderColor: ['checked'],
      opacity: ['disabled'],
      cursor: ['disabled']
    }
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/line-clamp'),
    require('tailwindcss-hyphens'),

    // plugin for individual border color
    ({ addUtilities, e, theme, variants }) => {
      const colors = flattenColorPalette(theme('borderColor'))
      delete colors['default']

      const colorMap = Object.keys(colors).map(color => ({
        [`.border-t-${color}`]: {borderTopColor: colors[color]},
        [`.border-r-${color}`]: {borderRightColor: colors[color]},
        [`.border-b-${color}`]: {borderBottomColor: colors[color]},
        [`.border-l-${color}`]: {borderLeftColor: colors[color]},
      }))
      const utilities = Object.assign({}, ...colorMap)

      addUtilities(utilities, variants('borderColor'))
    }
  ]
}
