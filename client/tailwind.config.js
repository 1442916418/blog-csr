/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */

// eslint-disable-next-line no-undef
module.exports = {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{vue,js,ts}'],
  theme: {
    extend: {
      width: {
        28.5: '7.5rem'
      }
    }
  },
  plugins: [require('@tailwindcss/forms'), require('@tailwindcss/line-clamp')]
}
