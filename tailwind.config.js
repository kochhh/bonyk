const colors = require('tailwindcss/colors')
const flattenColorPalette = require('tailwindcss/lib/util/flattenColorPalette').default

module.exports = {
  purge: {
    content: [
      './public/**/*.html',
      './src/**/*.vue'
    ],
    options: {
      safelist: ['overflow-auto', 'scrolling-touch', 'w-full', 'h-full', 'z-40', 'bg-opacity-50', 'bg-black', 'z-50', 'w-96', 'px-3', 'py-12', 'flex-shrink-0', 'overflow-visible', 'bg-white']
    }
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        sm: '2rem',
        lg: '4rem',
        xl: '5rem',
        '2xl': '6rem'
      }
    },
    extend: {
      keyframes: {
        'grow': {
          '0%': {
            transform: 'scale(0)'
          },
          '50%': {
            opacity: 1,
            transform: 'scale(1)'
          }
        }
      },
      animation: {
        'grow': '.75s linear infinite grow',
      },
    },
  },
  variants: {
    extend: {
      opacity: ['disabled'],
      cursor: ['disabled'],
    }
  },
  plugins: [
    require('@tailwindcss/forms'),

    // plugin for individual border color
    ({ addUtilities, e, theme, variants }) => {
      const colors = flattenColorPalette(theme('borderColor'))
      delete colors['default']

      const colorMap = Object.keys(colors)
        .map(color => ({
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
