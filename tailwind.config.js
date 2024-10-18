/** @type {import('tailwindcss').Config} */
const config = {
  mode: 'jit',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};

module.exports = config; // CommonJS形式でエクスポート
