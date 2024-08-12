const flowbite = require("flowbite-react/tailwind");

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    flowbite.content(),
  ],
  theme: {
    extend: {
      fontFamily: {
        'title': ['Playfair Display', 'sans-serif'],
        'sans': ['Lato', 'sans-serif'],
        'accent': ['Kaushan Script', 'cursive'],
        'dancingScript': ['Dancing Script', 'cursive'],
      },
      colors: {
        'myBeige': '#FFDAA9',
        'myGreen': '#15372C',
        'myLightGreen': '#1E4F3F',
      }
    },
  },
  plugins: [
    flowbite.plugin(),
  ],
}