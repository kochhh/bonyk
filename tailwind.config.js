const colors = require('tailwindcss/colors')
const flattenColorPalette = require('tailwindcss/lib/util/flattenColorPalette').default

module.exports = {
  purge: {
    content: [
      './public/**/*.html',
      './src/**/*.vue'
    ],
    options: {
      safelist: ['overflow-auto', 'scrolling-touch', 'w-full', 'h-full', 'z-40', 'bg-opacity-50', 'bg-black', 'z-50', 'w-96', 'px-3', 'py-12', 'flex-shrink-0', 'overflow-visible', 'bg-white', 'h-12', 'p-3', 'space-y-4', 'rounded-full', 'right-0', 'top-0', '-m-3', 'focus:ring-2', 'focus:ring-blue-500', 'focus:outline-none', 'focus:ring-opacity-50', 'h-4', 'w-4', 'max-w-lg', 'hover:bg-gray-200']
    }
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    screens: {
      'sm': '640px',
      'md': '768px',
      'lg': '1024px'
    },
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        sm: '2rem',
        lg: '4rem'
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
      transitionDuration: {
        '0': '0ms',
      }
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
