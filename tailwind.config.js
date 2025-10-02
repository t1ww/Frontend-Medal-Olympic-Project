/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        'sp':'0 3px 12px 0 rgba(0, 0, 0, 0.2)',
      }
      },
      fontFamily: {
        san: ['Avenir', 'Helvetica', 'Arial', 'sans-serif'],
        'mono': ['Roboto Mono', 'monospace'],
      },
      //this is animation class
      animation: {
        fade: 'yellowFade 3s ease-in-out;',
      },
      keyframes: {
        yellowFade: {
        '0%': { backgroundColor: 'yellow' },
        '100%': { backgroundColor: 'transparent' },
      },
      colors: {
        'olympic-blue': '#00a3e0',
        'olympic-yellow': '#fcd116',
        'olympic-black': '#000000',
        'olympic-green': '#00a651',
        'olympic-red': '#ee334e',
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}

