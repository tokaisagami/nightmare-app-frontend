/** @type {import('tailwindcss').Config} */
const config = {
  mode: 'jit',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        zenKurenaido: ['Zen Kurenaido', 'sans-serif'],
        kleeOne: ['Klee One', 'sans-serif'],
        Shizuru: ['Shizuru', 'sans-serif'],
        KaiseiOpti: ['Kaisei Opti', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

module.exports = config; // CommonJS形式でエクスポート
