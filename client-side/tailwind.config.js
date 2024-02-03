/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}', './src/pages/**/*.tsx', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      backgroundImage: {
        'custom-bg-1': "url('/src/assets/book-bg1.jpg')",
        'custom-bg-2': "url('/src/assets/book-bg2.jpg')",
      },
    },
  },
  plugins: [],
};
