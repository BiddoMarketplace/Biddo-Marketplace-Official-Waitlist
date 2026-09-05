/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ink: '#12130F',
        paper: '#F5F1E8',
        biddo: {
          amber: '#E8A33D',
          crimson: '#C4432B',
          moss: '#2B3A2E',
          sand: '#E7DFCC',
          line: '#D8CFB8',
        },
      },
      fontFamily: {
        display: ['"Fraunces"', 'serif'],
        sans: ['"General Sans"', '"Inter"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      maxWidth: {
        content: '1200px',
      },
    },
  },
  plugins: [],
}
