/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line import/no-anonymous-default-export
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      width: {
        main: '1180px',
      },
      colors: {
        main: '#505050',
        colorHover: '#FCF8EE',
        colorNav: '#B87331',
      },
      backgroundColor: {
        main: '#FCF8EE',
        blackmain: '#B87331',
      },
      fontFamily: {
        Poppins: ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
