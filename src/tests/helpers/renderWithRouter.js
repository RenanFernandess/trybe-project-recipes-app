import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render } from '@testing-library/react';
import Provider from '../../context/Provider';
import { RecipeProvider } from '../../context';

const renderWithRouter = (component) => {
  const history = createMemoryHistory();
  return {
    ...render(
      <Provider>
        <RecipeProvider>
          <Router history={ history }>
            { component }
          </Router>
        </RecipeProvider>
      </Provider>,
    ),
    history,
  };
};

export default renderWithRouter;
