module.exports = {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
    "./node_modules/flowbite/**/*.js"
  ],
  darkMode: 'media', // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        "dark-blue": "#15159e",
        "light-white": "rgb(255,255,255)"
      }
    }
  },
  variants: {
    extend: {}
  },
  plugins: [
        require('flowbite/plugin')
  ]
}
