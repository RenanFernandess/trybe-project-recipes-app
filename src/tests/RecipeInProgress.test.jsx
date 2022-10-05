import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './helpers/renderWithRouter';
import RecipeInProgress from '../pages/RecipeInProgress';

describe('Testa se há o titulo', () => {
  it('Testa se há o título ', () => {
    renderWithRouter(<RecipeInProgress />);
    expect(screen.getByText(/recipe in progress/i)).toBe('Recipe in Progress');
  });
});
