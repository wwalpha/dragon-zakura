import * as React from 'react';
import { render } from 'react-dom';
import { ThemeProvider } from '@mui/material';
import theme from './Theme';
import App from './containers/App';

const provider = (
  <ThemeProvider theme={theme}>
    <App />
  </ThemeProvider>
);

const root = document.getElementById('root');

// 画面描画
render(provider, root);
