const colors = require('tailwindcss/colors')

module.exports = {
  content: [
    './renderer/pages/**/*.{js,ts,jsx,tsx}',
    './renderer/layout/**/*.{js,ts,jsx,tsx}',
    './renderer/libs/**/components/*.{js,ts,jsx,tsx}',
    './renderer/libs/**/layout/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
