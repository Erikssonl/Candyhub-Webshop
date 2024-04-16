/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{html,js,jsx}"
  ],
  theme: {
    extend: {
      colors: {
        customBtnGreen: 'rgba(152, 204, 181, 0.50)',
      },
      boxShadow: {
        btnShadow: '4px 10px 25px 0px rgba(0, 0, 0, 0.25)',
      }
    }
  },
  plugins: [require("daisyui")],
}

