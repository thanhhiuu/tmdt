/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line import/no-anonymous-default-export
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      width: {
        main: '1180px',
      },
      borderColor: {
        main: '#505050',
      },
      flex: {
        2: '2 2 0%',
        3: '3 3 0%',
        4: '4 4 0%',
        5: '5 5 0%',
        6: '6 6 0%',
        7: '7 7 0%',
        8: '8 8 0%',
        9: '9 9 0%',
      },
      colors: {
        main: '#505050',
        colorHover: '#FCF8EE',
        colorNav: '#B87331',
      },
      backgroundColor: {
        main: '#FCF8EE',
        blackmain: '#B87331',
        opatitys: 'rgba(0, 0, 0, 0.7)',
      },
      fontFamily: {
        Poppins: ['Poppins', 'sans-serif'],
      },
      keyframes: {
        'slide-top': {
          '0%': {
            '-webkit-transform': 'translateY(30px)',
            transform: 'translateY(30px)',
          },
          '100% ': {
            '-webkit-transform': 'translateY(0)',
            transform: 'translateY(0)',
          },
        },
      },
      animation: {
        'slide-top':
          'slide-top 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;',
      },
    },
  },
  plugins: [],
};
