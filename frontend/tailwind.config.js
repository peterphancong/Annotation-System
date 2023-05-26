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
        "dark-gray": "#F2F4F8",
        "light-white": "rgb(255,255,255)"
      }
    },
    fontFamily: {
      'deca': ['lexend deca'],
      'sans': ['ui-sans-serif', 'system-ui'],
      'serif': ['ui-serif', 'Georgia'],
      'mono': ['ui-monospace', 'SFMono-Regular'],
      'display': ['Oswald'],
      'body': ['Open Sans']
    }
  },
  variants: {
    extend: {}
  },
  plugins: [
        require('flowbite/plugin')
  ]
}
