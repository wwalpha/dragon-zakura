import * as React from 'react';
import { Provider } from 'react-redux';
import { render } from 'react-dom';
import { ThemeProvider } from '@mui/material';
import store from './store';
import theme from './Theme';
import App from './containers/App';

const provider = (
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </Provider>
);

const root = document.getElementById('root');

// 画面描画
render(provider, root);
