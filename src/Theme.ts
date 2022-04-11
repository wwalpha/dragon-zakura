import { Theme, createMuiTheme } from '@mui/material';
import { orange } from '@mui/material/colors';

const theme: Theme = createMuiTheme({
  palette: {
    primary: {
      dark: '#003c8f',
      main: '#1565c0',
      light: '#5e92f3',
    },
    secondary: {
      dark: orange.A700,
      main: orange.A400,
      light: orange.A200,
    },
  },
});

export default theme;
