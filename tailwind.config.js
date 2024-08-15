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
    },
  },
  plugins: [],
}
