import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import fetchTotal from '../../cypress/mocks/fetch';
import Meals from '../pages/Meals';
import Drinks from '../pages/Drinks';
import App from '../App';

describe('Testa o Header', () => {
  beforeEach(() => {
    global.fetch = fetchTotal;
    jest.spyOn(global, 'fetch');
  });

  // afterEach(() => jest.clearAllMocks());

  it('Testa se o Header possui um título, botão de busca e botão de perfil', () => {
    renderWithRouter(<Meals />);
    expect(screen.getByRole('img', { name: /imagessearch/i })).toBeInTheDocument();
    expect(screen.getByRole('img', { name: /profile/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /meals/i })).toBeInTheDocument();
  });
  it('Testa se ao clicar no botão de busca, a barra de busca aparece na tela, e ao clicar novamente, ela desaparece', () => {
    renderWithRouter(<Meals />);
    userEvent.click(screen.getByRole('img', { name: /imagessearch/i }));
    expect(screen.getByRole('textbox')).toBeInTheDocument();
    userEvent.click(screen.getByRole('img', { name: /imagessearch/i }));
    expect(screen.queryByRole('textbox')).not.toBeInTheDocument();
  });
  it('Testa se ao selecionar um input de categoria, é realizado um fetch com o endpoint correto', () => {
    renderWithRouter(<Meals />);
    expect(screen.getByRole('radio', {
      name: /ingredientes/i })).toBeInTheDocument();
    expect(screen.getByRole('radio', {
      name: /primeira letra/i })).toBeInTheDocument();
    expect(screen.getByRole('radio', { name: /ingredientes/i })).toBeInTheDocument();
    userEvent.click(screen.getByRole('img', { name: /imagessearch/i }));
    expect(screen.getByRole('textbox')).toBeInTheDocument();
    userEvent.type(screen.getByRole('textbox'));
  });

  it('Testa se ao clicar no botão de perfil, o usuário é redirecionado para a paǵina de perfil', () => {
    const { history } = renderWithRouter(<Meals />);
    userEvent.click(screen.getByRole('img', { name: /profile/i }));
    expect(history.location.pathname).toBe('/profile');
  });
  it('Se é chamado quando clicado no radio Name paginas são chamadas corretamente.', async () => {
    const { history } = renderWithRouter(<App />);
    history.push('/meals');

    // botão search o simbolo de pesquisar
    const searchTop = screen.getByRole('button', { name: /imagessearch/i });
    expect(searchTop).toBeInTheDocument();
    userEvent.click(searchTop);

    const inputSearch = screen.getByTestId('search-input');
    userEvent.type(inputSearch, 'Arrabiata');
    expect(inputSearch).toBeInTheDocument();
    // depois vou clicar no input name
    const radioIngrediente = screen.getByText(/Nome/i);
    userEvent.click(radioIngrediente);
    expect(radioIngrediente).toBeInTheDocument();

    // await waitFor(() => {
    const busca = screen.getByText(/busca/i);
    userEvent.click(busca);
    const path = '/meals/52771';
    await waitFor(() => {
      expect(history.location.pathname).toBe(path);
    });
  });
  it('Para ver se aparece na página.', () => {
    renderWithRouter(<Drinks />);
    expect(screen.getByRole('heading', { name: /drinks/i })).toBeInTheDocument();
    expect(screen.getByRole('img', { name: /profile/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /imagessearch/i })).toBeInTheDocument();
    expect(screen.getByText(/ingredientes/i)).toBeInTheDocument();
    expect(screen.getByText(/nome/i)).toBeInTheDocument();
    expect(screen.getByText(/primeira letra/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /busca/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /all/i })).toBeInTheDocument();
    // expect(screen.getByText(/gg/i)).toBeInTheDocument();
  });

  it('teste de button icones', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/meals');

    const headerTitle = screen.getByTestId('page-title');
    const searchIcon = screen.getByTestId('search-top-btn');
    const pageTitle = screen.getByTestId('page-title');

    expect(headerTitle).toBeInTheDocument();
    expect(searchIcon).toBeInTheDocument();
    expect(pageTitle).toBeInTheDocument();

    userEvent.click(searchIcon);

    const searchInput = screen.getByTestId('search-input');
    expect(searchInput).toBeInTheDocument();
  });

  it('teste se é redirecionado', () => {
    const UserEmail = {
      email: 'trybe@test.com',
    };
    localStorage.setItem('user', JSON.stringify(UserEmail));
    const { history } = renderWithRouter(<App />);
    history.push('/meals');

    const profileIcon = screen.getByTestId('profile-top-btn');
    expect(profileIcon).toBeInTheDocument();
    userEvent.click(profileIcon);
    expect(history.location.pathname).toBe('/profile');
  });

  it('testar os icones das paginas', () => {
    const { history } = renderWithRouter(<App />);

    history.push('/meals');
    const mealsIcon = screen.getByRole('heading', { name: /meals/i });
    expect(mealsIcon).toBeInTheDocument();

    history.push('/drinks');
    const drinksIcon = screen.getByRole('heading', { name: /drinks/i });
    expect(drinksIcon).toBeInTheDocument();

    history.push('/profile');
    const profileIcon = screen.getByRole('button', { name: /profile/i });
    expect(profileIcon).toBeInTheDocument();

    // history.push('/RecipesDetails');
    // const doneRecipesIcon = screen.getByTestId('');
    // expect(doneRecipesIcon).toBeInTheDocument();

    // history.push('/FavoriteRecipes  ');
    // const favoriteRecipesIcon = screen.getByTestId('');
    // expect(favoriteRecipesIcon).toBeInTheDocument();
  });
});
