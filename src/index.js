import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { RecipeProvider } from './context';
import App from './App';
import light from './themes/light';

ReactDOM.render(
  <BrowserRouter>
    <ThemeProvider theme={ light }>
      <RecipeProvider>
        <App />
      </RecipeProvider>
    </ThemeProvider>
  </BrowserRouter>,
  document.getElementById('root'),
);
