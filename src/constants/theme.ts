import { createTheme } from '@mui/material';

const theme = createTheme({
  palette: {
    primary: {
      main: '#4747ff',
    },
    secondary: {
      main: '#208229',
    },
    error: {
      main: '#d32f2f',
    },
  },
  typography: {
    fontFamily: 'Poppins, sans-serif',
  },
});
export default theme;
