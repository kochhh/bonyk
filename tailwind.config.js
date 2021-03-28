const colors = require('tailwindcss/colors')
const flattenColorPalette = require('tailwindcss/lib/util/flattenColorPalette').default

module.exports = {
  purge: {
    content: [
      './public/**/*.html',
      './src/**/*.vue',
      './src/utils/components.js'
    ],
    safelist: [
      /-(leave|enter|appear)(|-(to|from|active))$/,
      /^(?!cursor-move).+-move$/,
      /^router-link(|-exact)-active$/
    ]
  },
  darkMode: 'class', // or 'media' or 'class'
  theme: {
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
    },
    colors: {
      ...colors,
      gray: colors.trueGray,
      green: colors.emerald,
      lime: colors.lime,
      transparent: 'transparent',
      current: 'currentColor'
    },
    boxShadow: {
      sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
      DEFAULT: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
      md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
      xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
      '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
      inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
      inset: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.4)',
      none: 'none'
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
    // require('@tailwindcss/line-clamp'),
    // require('tailwindcss-hyphens'),

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
