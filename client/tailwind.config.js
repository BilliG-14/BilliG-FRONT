/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    screens: {
      'sm': '640px',
      // => @media (min-width: 640px) { ... }
      'md': '768px',
      // => @media (min-width: 768px) { ... }
      'lg': '1024px',
      // => @media (min-width: 1024px) { ... }
      'xl': '1280px',
      // => @media (min-width: 1280px) { ... }
      '2xl': '1536px',
      // => @media (min-width: 1536px) { ... }
    },
    extend: {
      colors: {
        'b-yellow': '#F59E0B',
        'b-text-black': '#2D2D2E',
        'b-text-gray': '#bdbdbd',
        'b-bg-gray': '#F4F3F0',
        'b-ft-gray': '#8d8d8d',
        'b-chat-bg': '#e5dec9',
        'b-chat-text': '#312203',
        'b-hash-text': '#ffffff',
        'b-tag-dir': '#19CE60',
        'b-tag-pack': '#BA55CE',
        'b-tag-done': '#FA466A'
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
      },
      animation: {
        'fade-in': 'fadeIn 1.5s linear',
      },
    },
  },
  plugins: [],
};
