/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        sidebar: {
          DEFAULT: '#0B0B14',
          text: '#B4B4C7',
        },
        accent: {
          from: '#6C5CE7',
          to: '#4E7FFF',
        },
        surface: {
          light: '#F5F6FA',
          'light-card': '#FFFFFF',
          dark: '#0F0F1A',
          'dark-card': '#181826',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'accent-gradient': 'linear-gradient(135deg, #6C5CE7 0%, #4E7FFF 100%)',
      },
      keyframes: {
        orbit: {
          from: { transform: 'rotate(0deg)' },
          to: { transform: 'rotate(360deg)' },
        },
        'orbit-reverse': {
          from: { transform: 'rotate(360deg)' },
          to: { transform: 'rotate(0deg)' },
        },
      },
      animation: {
        orbit: 'orbit 40s linear infinite',
        'orbit-slow': 'orbit 70s linear infinite',
        'orbit-rev': 'orbit-reverse 55s linear infinite',
        'spin-scene': 'orbit 30s linear infinite',
      },
    },
  },
  plugins: [],
}
