import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import fetchTotal from '../../cypress/mocks/fetch';
import App from '../App';

describe('Testa o Reciper', () => {
  beforeEach(() => {
    global.fetch = fetchTotal;
    jest.spyOn(global, 'fetch');
  });

  afterEach(() => jest.clearAllMocks());

  it('Testa se o Header possui um título, botão de busca e botão de perfil', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/meals');
    Object.assign(navigator, {
      clipboard: {
        writeText: () => { 'Link copied!'; },
      },
    });
    jest.spyOn(navigator.clipboard, 'writeText');

    // const buttonShare = screen.getByRole('img', { name: /share/i });
    // userEvent.click(buttonShare);
    // expect(favoriteButton).toBeCalledWith('Link copied!');

    // const favoriteButton = screen.getByRole('button', { name: /favorite/i });
    // userEvent.click(favoriteButton);
    // expect(favoriteButton).toBeInTheDocument();
  });

  it('test if the search by name works correctly', async () => {
    const { history } = renderWithRouter(<App />);
    history.push('/meals');

    const searchIcon = screen.getByTestId('search-top-btn');
    expect(searchIcon).toBeInTheDocument();
    userEvent.click(searchIcon);

    const searchInput = screen.getByTestId('search-input');
    expect(searchInput).toBeInTheDocument();
    userEvent.type(searchInput, 'xablau');

    const nameRadio = screen.getByTestId('name-search-radio');
    expect(nameRadio).toBeInTheDocument();
    userEvent.click(nameRadio);

    const busca = screen.getByTestId('exec-search-btn');
    expect(busca).toBeInTheDocument();
    userEvent.click(busca);

    await waitFor(() => {
      const recipes = screen.getAllByTestId(/\S-recipe-card/i);
      expect(recipes).toHaveLength(12);
    });
  });
});
