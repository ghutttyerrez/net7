/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          lime: '#adcc05',
          blue: '#4966a0',
          light: '#f9f9f9',
          white: '#ffffff',
          black: '#000000'
        }
      },
      fontFamily: {
        sans: ['system-ui', 'Avenir', 'Helvetica', 'Arial', 'sans-serif']
      },
      boxShadow: {
        'glow-lime': '0 0 0 3px rgba(173,204,5,0.35)',
      }
    },
  },
  plugins: [],
}

