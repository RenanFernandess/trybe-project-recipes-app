import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { FavoritesProvider, RecipeProvider } from './context';
import App from './App';
import light from './themes/light';
import './index.css';

ReactDOM.render(
  <BrowserRouter>
    <ThemeProvider theme={ light }>
      <RecipeProvider>
        <FavoritesProvider>
          <App />
        </FavoritesProvider>
      </RecipeProvider>
    </ThemeProvider>
  </BrowserRouter>,
  document.getElementById('root'),
);
