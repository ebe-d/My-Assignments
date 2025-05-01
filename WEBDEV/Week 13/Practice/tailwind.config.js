/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
   
    extend: {
      darkmode:'selector',
      colors:{
        blue:{
          800:'#111A5C', //bg
          900:'#21366D', //input
        },
        green:{
          800:'#04AAAD' //Logo
        },
      }
    },
  },
  plugins: [],
}

