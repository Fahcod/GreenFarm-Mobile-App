/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors:{
        primary:{
          300:'#16a34a'
        },
        input:'#f7f6f6',
        dark:{
          300:"#08111c"
        }
      }
    },
  },
  plugins: [],
}

