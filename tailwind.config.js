/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
      },
      screens: {
        'xs': '540px', // Breakpoint customizado
        '2xl': '1516px', // Exemplo de breakpoint adicional
        '2md': '1110px', // Exemplo de breakpoint adicional
      },
      colors: {
        customBlue: 'rgba(191, 243, 255, 0.9)',
        customText: 'rgba(197, 226, 228, 0.7)',
      },
      backgroundImage: {
        'custom-gradient':'linear-gradient(90deg, rgba(130, 224, 245, 0.02) 0%, rgba(130, 224, 245, 0.03) 39%, rgba(226, 118, 150, 0.03) 64%, rgba(226, 118, 150, 0.01) 100%)',,
      },
    },
  },
  plugins: [],
}
