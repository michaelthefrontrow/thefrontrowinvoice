/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Inter', 'Helvetica Neue', 'Arial', 'sans-serif'],
      },
      colors: {
        primary: {
          bg: '#f5ebd6',
          text: '#fb5353'
        }
      }
    },
  },
  plugins: [],
};