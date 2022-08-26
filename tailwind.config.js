module.exports = {
  future: {
    removeDeprecatedGapUtilities: true,
  },
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    fill: (theme) => ({
      red: theme('color.red.primary'),
    }),
    colors: {
      white: '#ffffff',
      blue: {
        medium: '#005c98',
      },
      black: {
        light: '#005c98',
        faded: '#00000059',
      },
      gray: {
        base: '#616161',
        bacground: '#fafafa',
        primary: '#dbdbdb',
      },
      red: {
        primary: '#ed4956',
      },
    },
  },
}