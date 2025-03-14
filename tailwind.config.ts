/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        logoblue: {
          10: '#0FB3D1',
          20: '#e5feff',
          30: '#00344e',
          40: '#e5feff',
          50: '#5489d2',
          60: '#1ca0d7',
          light: '#e6f4f1',
        },
        logobrown: {
          10: '#9d4400',
          20: '#ffe9cf',
        },
        green: {
          50: '#30AF5B',
          90: '#292C27',
        },
        gray: {
          10: '#EEEEEE',
          20: '#A2A2A2',
          30: '#7B7B7B',
          50: '#585858',
          90: '#141414',
        },
        orange: {
          50: '#FF814C',
        },
        blue: {
          70: '#021639',
        },
        yellow: {
          50: '#FEC601',
          logo: '#eee8a9',
        },
      },
      screens: {
        xs: '400px',
        '3xl': '1680px',
        '4xl': '2200px',
        lg: '1170px',
      },
      maxWidth: {
        '10xl': '1512px',
      },
      borderRadius: {
        '5xl': '40px',
      },
      fontFamily: {
        bebas: ['Bebas Neue', 'sans-serif'],
        ubuntu: ['Ubuntu', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
