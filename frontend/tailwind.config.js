/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['Georgia', 'Cambria', 'Times New Roman', 'serif'],
      },
      colors: {
        ink: '#07110d',
        paper: '#f4f1e8',
        fern: '#1f5c43',
        lime: '#b9e769',
        mist: '#dfe8df',
      },
      boxShadow: {
        soft: '0 24px 80px rgba(4, 15, 10, 0.14)',
      },
    },
  },
  plugins: [],
}

