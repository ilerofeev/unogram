module.exports = {
  future: {
    removeDeprecatedGapUtilities: true,
  },
  content: ['./pages/**/*.{ts,tsx}', './public/**/*.html', './components/**/*.{ts,tsx}'],
  theme: {
    fill: (theme) => ({
      red: theme('colors.red.primary'),
    }),
    extend: {
      colors: {
        white: '#ffffff',
        blue: {
          medium: '#005c98',
        },
        black: {
          light: '#262626',
          faded: '#00000059',
        },
        gray: {
          base: '#616161',
          background: '#fafafa',
          primary: '#dbdbdb',
        },
        red: {
          primary: '#ed4956',
        },
      },
    },
  },
  variants: {
    extend: {
      display: ['group-hover'],
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('tailwind-scrollbar'),
    require('tailwind-scrollbar-hide'),
  ],
}
