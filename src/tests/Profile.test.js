import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import fetchTotal from '../../cypress/mocks/fetch';
import App from '../App';
// import { saveItem, getItem } from '../helpers/storage';

describe('Testa o Profile', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(fetchTotal),
      // .mockResolvedValueOnce(saveItem)
      // .mockResolvedValueOnce(getItem),

    });
  });
  // afterEach(() => { localStorage.clear(); });
  afterEach(() => jest.clearAllMocks());

  it('Testa se há  ', async () => {
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

    const profileIngredientes = screen.getByText(/ingredientes/i);
    expect(profileIngredientes).toBeInTheDocument();

    const profileName = screen.getByText(/nome/i);
    expect(profileName).toBeInTheDocument();

    const profileFirst = screen.getByText(/primeira letra/i);
    expect(profileFirst).toBeInTheDocument();

    const profileBusca = screen.getByTestId('exec-search-btn');
    expect(profileBusca).toHaveTextContent('Busca');
    // userEvent.click(profileBusca);

    history.push('/profile');
    const profileEmail = screen.getByTestId('profile-email');
    expect(profileEmail).toBeInTheDocument();
    const profileDoceRecipes = screen.getByRole('button', { name: /done recipes/i });

    expect(profileDoceRecipes).toBeInTheDocument();
    userEvent.click(profileDoceRecipes);
    expect(history.location.pathname).toBe('/done-recipes');

    history.push('/favorite-recipes');

    // expect(profileFavorite).toBeInTheDocument();
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
