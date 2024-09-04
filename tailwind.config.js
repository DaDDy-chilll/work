/** @type {import('tailwindcss').Config} */

import { colors } from './src/assets/theme/theme';

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      screens: {
        xs: { max: '640px' },
        sm: { min: '640px' },
        md: { min: '768px' },
        lg: { min: '1024px' },
        xl: { min: '1280px' },
        '2xl': { min: '1536px' },
      },
      colors: {
        primary: {
          ...colors.paleBlue,
          primary: colors.paleBlue[800],
        },
        secondary: {
          ...colors.secondary,
          primary: colors.secondary[200],
        },
      },
    },
    fontFamily: {
      sans: ['Poppins'],
    },
  },
  plugins: [],
};
