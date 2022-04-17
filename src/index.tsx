import * as React from 'react';
import { render } from 'react-dom';
import { ThemeProvider } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import { orange } from '@mui/material/colors';
import App from './App';

const theme = createTheme({
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

const provider = (
  <ThemeProvider theme={theme}>
    <App />
  </ThemeProvider>
);

const root = document.getElementById('root');

// 画面描画
render(provider, root);
