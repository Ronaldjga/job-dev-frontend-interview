module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    './src/patterns/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        bluePrimary: '#009CA3',
        darkPurple: '#2B0D61',
        softPurple: '#B5ABD4',
        tranparentGray: '#00000033'
      }
    },
  },
  plugins: [],
}
