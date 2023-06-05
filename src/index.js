import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { RecipeProvider } from './context';
import { ThemeProvider } from 'styled-components';
import light from './theme/light';

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
