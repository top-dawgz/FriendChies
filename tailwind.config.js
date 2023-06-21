/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './client/components/**/*.{html,js}',
    './client/pages/**/*.{html,js}',
    './client/**/*.{html,js}'
],
  theme: {
    extend: {
      backgroundImage: {
        'paw': "url('./assets/paw.png')",
        'poop': "url('./assets/poop.png')"
      }
    },
  },
  plugins: [],
}

