/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        navy: { 900: '#0a1628', 800: '#0d1f3c', 700: '#1a3a5c', 600: '#1e4a7a' },
      }
    },
  },
  plugins: [],
}
