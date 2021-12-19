const colors = require('tailwindcss/colors')

module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: colors.lightBlue,
      },
      keyframes: {
        scale: {
          from: { transform: 'scale(0)' },
          to: { transform: 'scale(1)' },
        },
        circular: {
          '0%': {
            'stroke-dasharray': '1, 200',
            'stroke-dashoffset': '0',
          },
          '50%': {
            'stroke-dasharray': '90, 150',
            'stroke-dashoffset': '-40',
          },
          '100%': {
            'stroke-dasharray': '90, 150',
            'stroke-dashoffset': '-120',
          },
        },
      },
      animation: {
        scale: 'scale 600ms ease-in-out',
        circular: 'circular 1.5s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
