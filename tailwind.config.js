/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.jsx", "./src/**/*.jsx"],
  theme: {
    extend: {
      fontFamily: {
        WorksansBold: ["WorkSans-Bold"],
        WorksansSemiBold: ["WorkSans-SemiBold"],
        WorksansRegular: ["WorkSans-Regular"],
        WorksansMedium: ["WorkSans-Medium"],
        WorksansLight: ["WorkSans-Light"],
      },
    },
  },
  plugins: [],
}

