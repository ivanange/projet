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

        gray: colors.gray,
        'cool-gray': colors.coolGray,
        'true-gray': colors.trueGray,
        'blue-gray': colors.blueGray,
        'warm-gray': colors.warmGray,
        'light-blue': colors.lightBlue,
        orange: colors.orange,
        amber: colors.amber,
        yellow: colors.yellow,
        green: colors.green,
        emerald: colors.emerald,
        lime: colors.lime,
        teal: colors.teal,
        cyan: colors.cyan,
        violet: colors.violet,
        purple: colors.purple,
        fuchsia: colors.fuchsia,
        rose: colors.rose,
      },

      minWidth: {
        xs: '16rem'
      },
      height: {
        fit: 'fit-content'
      }
    },

  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
