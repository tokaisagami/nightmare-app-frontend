/** @type {import('tailwindcss').Config} */
module.exports = {
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
      colors: {
        'title': '#d850ff', // カスタムカラーを追加
      },
    },
  },
  plugins: [],
};
