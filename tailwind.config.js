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

console.log(config); // デバッグ用の出力

module.exports = config; // CommonJS形式でエクスポート
