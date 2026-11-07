/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#0b1020',
        muted: '#5b6478',
        line: '#e3e8f2',
        paper: '#f6f8fc',
        night: { DEFAULT: '#070b16', card: '#0f1626' },
        brand: { DEFAULT: '#1a66ff', 600: '#1446d6' },
      },
      fontFamily: {
        sans: ['Manrope', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      boxShadow: {
        glow: '0 10px 30px -8px rgba(26,102,255,0.55)',
        card: '0 24px 60px -24px rgba(11,16,32,0.35)',
      },
    },
  },
  plugins: [],
}
