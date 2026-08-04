/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'bg-900': '#050816'
      },
      boxShadow: {
        neon: '0 8px 30px rgba(99,102,241,0.08), 0 0 40px rgba(56,189,248,0.06)'
      }
    },
  },
  plugins: [],
}

