import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import Provider from './context/Provider';
import GlobalStyle from './styles/golbal';

ReactDOM.render(
  <BrowserRouter>
    <GlobalStyle />
    <Provider>
      <App />
    </Provider>
  </BrowserRouter>,
  document.getElementById('root'),
);
