/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily:{
        "poppins":["Poppins","sans-serif"],
        "poppins-light":["Poppins-Light","sans-serif"],
        "poppins-semibold":["Poppins-Semibold","sans-serif"],
        "poppins-medium":["Poppins-Medium","sans-serif"],
        "poppins-bold":["Poppins-Bold","sans-serif"],
        "poppins-extrabold":["Poppins-Extrabold","sans-serif"]
      },
      colors:{
        primary:{
          300:'#16a34a'
        },
        input:'#f7f6f6',
        dark:{
          300:"#08111c"
        },
        accent:{
          300:'#f6f4fb'
        }
      }
    },
  },
  plugins: [],
}

