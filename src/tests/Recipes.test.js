import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import fetchTotal from '../../cypress/mocks/fetch';
import mealCategories from '../../cypress/mocks/mealCategories';
import chickenMeals from '../../cypress/mocks/chickenMeals';
import meals from '../../cypress/mocks/meals';
import App from '../App';

describe('Testa o Reciper', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(mealCategories)
        .mockResolvedValueOnce(meals)
        .mockResolvedValueOnce(fetchTotal)
        .mockResolvedValueOnce(chickenMeals),
    });
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
  it('Se todos os botões categorias estão definidos', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(mealCategories).mockResolvedValueOnce(meals),
    });
    const { history } = renderWithRouter(<App />);
    history.push('/meals');

    await waitFor(() => expect(global.fetch).toHaveBeenCalled());

    expect(screen.getByTestId('All-category-filter')).toBeDefined();
    expect(screen.getByTestId('Chicken-category-filter')).toBeDefined();
    expect(screen.getByTestId('Beef-category-filter')).toBeDefined();
    expect(screen.getByTestId('Breakfast-category-filter')).toBeDefined();
    expect(screen.getByTestId('Dessert-category-filter')).toBeDefined();
    expect(screen.getByTestId('Goat-category-filter')).toBeDefined();
  });
  it('Se há alteração dos botões ', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(mealCategories)
        .mockResolvedValueOnce(chickenMeals),
    });

    const { history } = renderWithRouter(<App />);
    history.push('/meals');

    await waitFor(() => expect(global.fetch).toHaveBeenCalled());
    const chikenCategory = await screen.getByTestId('Chicken-category-filter');
    userEvent.click(chikenCategory, 'Chicken');
    expect(chikenCategory).toHaveValue('Chicken');

    const beef = await screen.findByTestId('Beef-category-filter');
    userEvent.click(beef);
    expect(beef).toHaveValue('Beef');

    const all = await screen.findByTestId('All-category-filter');
    userEvent.click(beef);
    expect(all).toHaveValue('All');
  });
});
