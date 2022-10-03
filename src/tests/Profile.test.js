import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import fetchTotal from '../../cypress/mocks/fetch';
import App from '../App';

describe('Testa o Drinks', () => {
  beforeEach(() => {
    global.fetch = fetchTotal;
    jest.spyOn(global, 'fetch');
  });

  afterEach(() => jest.clearAllMocks());
  const profileTitle = (screen.getByRole('heading', { name: /profile/i }));
  const profileIngredientes = (screen.getByText(/ingredientes/i));
  const profileName = (screen.getByText(/nome/i));
  const profileFirst = (screen.getByText(/primeira letra/i));
  const profileBusca = (screen.getByRole('button', { name: /busca/i }));
  const profileEmail = (screen.getByTestId('profile-email'));
  const profileDoceRecipes = (screen.getByRole('button', { name: /done recipes/i }));
  const profileFavorite = (screen.getByRole('button', { name: /favorite recipes/i }));
  const profileLogout = (screen.getByRole('button', { name: /logout/i }));

  it('Testa os retornos Ingredientes/Drinks ', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/profile');
    expect(profileTitle).toBeInTheDocument();

    expect(profileIngredientes).toBeInTheDocument();
    userEvent.click(profileIngredientes);

    expect(profileName).toBeInTheDocument();
    userEvent.click(profileName);

    expect(profileFirst).toBeInTheDocument();
    userEvent.click(profileFirst);

    expect(profileBusca).toBeInTheDocument();
    userEvent.click(profileBusca);

    expect(profileEmail).toBeInTheDocument();

    expect(profileDoceRecipes).toBeInTheDocument();
    userEvent.click(profileDoceRecipes);
    expect(history.location.pathname).toBe('/doce-recipes');

    expect(profileFavorite).toBeInTheDocument();
    userEvent.click(profileFavorite);
    expect(history.location.pathname).toBe('/favorite-recipes');

    userEvent.click(profileLogout);
  });
});
