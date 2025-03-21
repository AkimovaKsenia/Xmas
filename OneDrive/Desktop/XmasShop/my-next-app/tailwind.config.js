module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}", // Все страницы
    "./components/**/*.{js,ts,jsx,tsx}", // Все компоненты
    "./app/**/*.{js,ts,jsx,tsx}", // Если используешь app-директорию (например, для Next.js 13+)
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
