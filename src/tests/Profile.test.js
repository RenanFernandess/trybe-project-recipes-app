import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import fetchTotal from '../../cypress/mocks/fetch';
import App from '../App';

describe('Testa o Profile', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(fetchTotal),
    });
  });
  afterEach(() => { localStorage.clear(); });
  it('Testa se há  ', () => {
    renderWithRouter(<App />);
    const email = screen.getByTestId('email-input');
    const senha = screen.getByTestId('password-input');
    const butonLogin = screen.getByTestId('login-submit-btn');

    const { history } = renderWithRouter(<App />);

    expect(email).toBeInTheDocument();
    userEvent.type('trybe@trybe.com.br');

    expect(senha).toBeInTheDocument();
    userEvent.type('123456');
    expect(butonLogin).toBeInTheDocument();
    userEvent.click(butonLogin);
    history.push('/meals');
    const profileImage = screen.getByTestId('profile-top-btn');
    expect(profileImage).toBeInTheDocument();

    const profileBtn = screen.getByTestId('profile-top-btn');
    expect(profileBtn).toBeInTheDocument();
    userEvent.click(profileBtn);

    history.push('/profile');
    const profileEmail = screen.getByTestId('profile-email');
    expect(profileEmail).toBeInTheDocument();
    const profileDoceRecipes = screen.getByRole('button', { name: /done recipes/i });

    expect(profileDoceRecipes).toBeInTheDocument();
    userEvent.click(profileDoceRecipes);
    expect(history.location.pathname).toBe('/done-recipes');

    history.push('/favorite-recipes');
  });

  it('Se é direcionado a pagina de favoritos ', async () => {
    const { history } = renderWithRouter(<App />);
    history.push('/profile');
    const profileFavorite = screen.getByRole('button', { name: /favorite recipes/i });
    await waitFor(() => {
      userEvent.click(profileFavorite);
      expect(history.location.pathname).toBe('/favorite-recipes');
    });
  });
  it('Sair da pagina ', async () => {
    const { history } = renderWithRouter(<App />);
    history.push('/profile');
    const profileLogout = screen.getByRole('button', { name: /logout/i });
    userEvent.click(profileLogout);
    await waitFor(() => {
      expect(history.location.pathname).toBe('/');
    });
  });
});
