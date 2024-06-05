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
        costomCardPink: '#F8C6D1',
        costomCardLightGreen: '#A3E4C7',
        costomCardLightBlue:'#A2D2FF',
        costomCardPurpul:'#D6BCFA',
        costomCardDarkBlue: '#A4CAEE',
        costomCardDarkGreen: '#98CCB5'
      },
      boxShadow: {
        btnShadow: '4px 10px 25px 0px rgba(0, 0, 0, 0.25)',
      }
    }
  },
  plugins: [require("daisyui")],
}

