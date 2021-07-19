const colors = require('tailwindcss/colors');

module.exports = {
  purge:  ['./src/index.html', './src/**/*.{html,js,ts,jsx,tsx}'],
  variants: {
    extend: {
      backgroundColor: ['checked', 'group-hover', 'group-focus'],
      borderColor: ['checked', 'group-hover', 'group-focus'],
      inset: ['hover', 'focus', 'checked', 'group-hover', 'group-focus'],
      borderWidth: ['hover', 'focus', 'group-hover', 'group-focus'],
      padding: ['hover', 'focus', 'group-hover', 'group-focus'],
      margin: ['hover', 'focus', 'group-hover', 'group-focus'],
    }
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      backgroundImage: () => ({
        'gradient-135deg': "linear-gradient(135deg, var(--tw-gradient-stops));",
       }),
       colors: {
        'black-overlay': '#00000059',
        'regal-blue': '#243c5a',

        ...colors,
        'cool-gray': colors.coolGray,
        'true-gray': colors.trueGray,
        'blue-gray': colors.blueGray,
        'warm-gray': colors.warmGray,
      },

      minWidth: {
        xs: '16rem'
      },

      height: {
        fit: 'fit-content'
      },

      boxShadow: {
        'round-lg': '0 0px 15px -3px rgba(0, 0, 0, 0.1), 0 0px 10px -2px rgba(0, 0, 0, 0.05)',
      }
    },

  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
