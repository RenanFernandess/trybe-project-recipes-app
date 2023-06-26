import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { RecipeProvider } from '../../context';
import light from '../../themes';

const renderWithRouter = (component) => {
  const history = createMemoryHistory();
  return {
    ...render(
      <ThemeProvider theme={ light }>
        <RecipeProvider>
          <Router history={ history }>
            { component }
          </Router>
        </RecipeProvider>
      </ThemeProvider>,
    ),
    history,
  };
};

export default renderWithRouter;
