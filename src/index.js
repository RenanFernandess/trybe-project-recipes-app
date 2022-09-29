import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import App from './App';
import Provider from './context/Provider';
import GlobalStyle from './styles/golbal';
import theme from './styles/themes/index';

ReactDOM.render(
  <BrowserRouter>
    <ThemeProvider theme={ theme }>
      <Provider>
        <GlobalStyle />
        <App />
      </Provider>
    </ThemeProvider>
  </BrowserRouter>,
  document.getElementById('root'),
);
