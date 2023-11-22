import { createTheme } from '@mui/material';
import MontseratBold from '@/fonts/Montserrat-Bold.ttf';
import MontseratRegular from '@/fonts/Montserrat-Regular.ttf';
import MontseratMedium from '@/fonts/Montserrat-Medium.ttf';
import type {} from '@mui/x-date-pickers/themeAugmentation';

const theme = createTheme({
  typography: {
    fontFamily: ['Montserrat-Bold', 'Montserrat-Regular', 'Montserrat-Medium'].join(','),
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
          @font-face {
            font-family: 'Montserrat-Bold';
            font-style: normal;
            font-display: swap;
            font-weight: 700;
            src: local('Raleway'), local('Raleway-Regular'), url(${MontseratBold}) format('woff2');
          }
          @font-face {
            font-family: 'Montserrat-Regular';
            font-style: normal;
            font-display: swap;
            font-weight: 400;
            src: local('Raleway'), local('Raleway-Regular'), url(${MontseratRegular}) format('woff2');
          }
          @font-face {
            font-family: 'Montserrat-Medium';
            font-style: normal;
            font-display: swap;
            font-weight: 500;
            src: local('Raleway'), local('Raleway-Regular'), url(${MontseratMedium}) format('woff2');
          }
        `,
    },
  },
});

export default theme;
