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
