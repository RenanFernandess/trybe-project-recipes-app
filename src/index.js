import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import Provider from './context/Provider';

ReactDOM.render(
  <BrowserRouter>
    <Provider>
      <App />
    </Provider>
  </BrowserRouter>,
  document.getElementById('root'),
);
