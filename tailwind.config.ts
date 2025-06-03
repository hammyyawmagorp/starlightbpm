/** @type {import('tailwindcss').Config} */
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      keyframes: {
        drawLine: {
          '0%': { clipPath: 'inset(0 0 98% 0)' },
          '25%': { clipPath: 'inset(0 0 0 0)' },
          '50%': { clipPath: 'inset(0 0 0 0)' },
          '75%': { clipPath: 'inset(98% 0 0 0)' },
          '100%': { clipPath: 'inset(0 0 98% 0)' },
        },
        shadowPulse: {
          '0%': { boxShadow: '0 0 0 0 rgba(255, 215, 0, 0.9)' },
          '50%': { boxShadow: '0 0 30px 15px rgba(255, 215, 0, 0.7)' },
          '100%': { boxShadow: '0 0 0 0 rgba(255, 215, 0, 0.9)' },
        },
      },
      colors: {
        'logoblue-10': '#1a365d',
        'logoblue-20': '#2a4a7d',
        'logoblue-30': '#3a5e9d',
        'logoblue-40': '#4a72bd',
        'logoblue-50': '#5a86dd',
        'logoblue-light': '#e6edf7',
        'logobrown-10': '#8B4513',
        'logobrown-20': '#A0522D',
        'yellow-logo': '#FFD700',
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
        'service-card': '315px',
        'service-card-sm': '435px',
        'service-card-md': '768px',
        'service-card-lg': '857px',
        'service-card-xl': '1168px',
        'service-card-2xl': '1393px',
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
      height: {
        'service-card': '440px',
        'service-card-sm': '460px',
        'service-card-md': '420px',
        'service-card-lg': '380px',
        'service-card-xl': '400px',
        'service-card-2xl': '340px',
      },
    },
  },
  plugins: [],
}
export default config
