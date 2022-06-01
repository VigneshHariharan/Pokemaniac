const defaultTheme = require('tailwindcss/defaultTheme')
const colors = require('tailwindcss/colors')

module.exports = {
  content: ['./src/index.html','./src/**/*.{html,css,js,jsx}',
  './node_modules/tw-elements/dist/js/**/*.js'
  ],
  plugins: [require('tw-elements/dist/plugin')],
  // for dynamic css
  safelist: [
    {
      pattern: /bg-types-/,
      variants: ['lg', 'hover', 'focus', 'lg:hover'],
    }
],
  // mode: 'jit',
  // purge: ['./public/**/*.html', './src/**/*.{js,jsx,ts,tsx}'],
  darkMode:'class',
  theme: {
    extend: {
      fontFamily:{
        'sans':['Source Sans Pro',...defaultTheme.fontFamily.sans]
      },
      colors: {
        types: {
          normal:"#a8a878",
          fighting: '#c02038',
          flying: '#a890f0',
          poison: '#a040a0',
          ground:'#e0c068',
          rock: '#b8a038',
          bug: '#a8b820',
          ghost: '#705898',
          steel:'#b8b8d0',
          fire: '#f08030',
          water:'#6890f0',
          grass:'#78c850',
          electric: '#f8d030',
          psychic:'#f85888',
          ice:'#98d8d8',
          fairy:'#ee99ac',
          dragon:'#7038f8',
          dark: '#705848'
        }
    },
    }
  },
  plugins: []
}
