/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'class',
  theme: {
    screens: {
      sm: '640px',
      // => @media (min-width: 640px) { ... }
      md: '768px',
      // => @media (min-width: 768px) { ... }
      lg: '1024px',
      // => @media (min-width: 1024px) { ... }
      xl: '1280px',
      // => @media (min-width: 1280px) { ... }
      '2xl': '1536px',
      // => @media (min-width: 1536px) { ... }
    },
    extend: {
      colors: {
        'b-yellow': '#F59E0B',
        'b-text-black': '#2D2D2E',
        'b-text-gray': '#e0e0e0',
        'b-text-brightgray': '#eeeeee',
        'b-text-darkgray': '#757575',
        'b-bg-gray': '#F4F3F0',
        'b-ft-gray': '#8d8d8d',
        'b-chat-bg': '#e5dec9',
        'b-chat-text': '#312203',
        'b-hash-text': '#ffffff',
        'b-tag-dir': '#19CE60',
        'b-tag-pack': '#BA55CE',
        'b-tag-done': '#FA466A',
        'b-bg-sec0': '#7ca6a2',
        'b-bg-sec1': '#cf9493',
        'b-bg-sec2': '#CE8467',
        'b-bg-sec3': '#D5CB8E',
        'b-bg-sec4': '#909FA6',
        'b-bg-sec5': '#709FB0',
        'b-bg-sec6': '#FDAE84',
        'b-bg-sec7': '#E9DCCD',
        'b-bg-sec8': '#D1A827',
        'b-bg-dark': '#3E476A',
        'b-card-dark': '#5E678A',
        'b-dark-yellow': '#EDA240',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        fadeInLater: {
          '0%': { opacity: 0 },
          '50%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        popOut: {
          '0%': {
            opacity: 0,
            transform: 'translateY(0%)',
          },
          '50%': {
            opacity: 0.8,
            transform: 'translateY(-30%)',
          },
          '100%': {
            opacity: 1,
            transform: 'translateY(0%)',
          },
        },
        popToRight: {
          '0%': {
            opacity: 0,
            transform: 'translateX(-100%)',
          },
          '100%': {
            opacity: 1,
            transform: 'translateY(0%)',
          },
        },
        CenterToLeftTop: {
          '0%': {
            opacity: 0,
            transform: 'translate(150%, 50%) rotate(90deg)',
          },
          '100%': {
            opacity: 1,
          },
        },
        CenterToLeftBottom: {
          '0%': {
            opacity: 0,
            transform: 'translate(150%, -50%) rotate(90deg)',
          },
          '100%': {
            opacity: 1,
          },
        },
        CenterToRightBottom: {
          '0%': {
            opacity: 0,
            transform: 'translate(-150%, -50%) rotate(90deg)',
          },
          '100%': {
            opacity: 1,
          },
        },
        CenterToRightTop: {
          '0%': {
            opacity: 0,
            transform: 'translate(-150%, 50%) rotate(-90deg)',
          },
          '100%': {
            opacity: 1,
          },
        },
        Marquee: {
          '0%': {
            transform: 'translateX(0)',
          },
          '100%': {
            transform: 'translateX(-100%)',
          },
        },
      },
      animation: {
        'fade-in-150ms': 'fadeIn 150ms linear',
        'fade-in': 'fadeIn 1.5s linear',
        'fade-in-later': 'fadeInLater 1.5s linear',
        'pop-out': 'popOut 1000ms ease-in-out 700ms both',
        'pop-to-right': 'popToRight 1000ms ease-in-out 1s both',
        'center-to-lt': 'CenterToLeftTop 500ms linear 1s both',
        'center-to-lb': 'CenterToLeftBottom 500ms linear 1.2s both',
        'center-to-rb': 'CenterToRightBottom 500ms linear 1.4s both',
        'center-to-rt': 'CenterToRightTop 500ms linear 1.6s both',
        marquee: 'Marquee 55s linear infinite',
      },
    },
  },
  plugins: [],
};
