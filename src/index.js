import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import Provider from './context/Provider';
import { RecipeProvider } from './context';

ReactDOM.render(
  <BrowserRouter>
    <Provider>
      <RecipeProvider>
        <App />
      </RecipeProvider>
    </Provider>
  </BrowserRouter>,
  document.getElementById('root'),
);
