/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['Instrument Serif', 'Georgia', 'serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'monospace'],
      },
      colors: {
        obsidian: '#101110',
        charcoal: '#242522',
        brass: '#B5A07C',
        ivory: '#F1EDE4',
        sage: '#777C70',
      },
      boxShadow: {
        soft: '0 24px 80px rgba(16, 17, 16, 0.10)',
      },
    },
  },
  plugins: [],
}

