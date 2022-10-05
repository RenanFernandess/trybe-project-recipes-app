import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import fetchTotal from '../../cypress/mocks/fetch';
import drinkCategories from '../../cypress/mocks/drinkCategories';
import oneDrink from '../../cypress/mocks/oneDrink';
import drinks from '../../cypress/mocks/drinks';
import App from '../App';
import drinkIngredients from '../../cypress/mocks/drinkIngredients';

describe('Testa o Drinks', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(fetchTotal)
        .mockResolvedValueOnce(drinkCategories)
        .mockResolvedValueOnce(drinks)
        .mockResolvedValueOnce(oneDrink),
    });
  });

  afterEach(() => jest.clearAllMocks());
  it('Testa os retornos Nome/Drinks ', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/drinks');

    const btnSearch = screen.getByRole('img', { name: /imagessearch/i });
    userEvent.click(btnSearch);
    const inputSearch = screen.getByRole('textbox');
    userEvent.type(inputSearch, 'Gin');
    const nomeRadio = screen.getByText(/ingredientes/i);
    userEvent.click(nomeRadio);
    const btnBusca = screen.getByRole('button', { name: /busca/i });
    userEvent.click(btnBusca);
    expect(inputSearch).toHaveValue('Gin');
  });

  it('Testa os retornos Ingredientes/Drinks', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/drinks');

    const btnSearch = screen.getByRole('img', { name: /imagessearch/i });
    userEvent.click(btnSearch);
    const inputSearch = screen.getByRole('textbox');
    userEvent.type(inputSearch, 'Amaretto');
    const nomeRadio = screen.getByText(/ingredientes/i);
    userEvent.click(nomeRadio);
    const btnBusca = screen.getByRole('button', { name: /busca/i });
    userEvent.click(btnBusca);
    expect(inputSearch).toHaveValue('Amaretto');
  });

  it('Testa os retornos firstLetter/Drinks', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/drinks');

    const btnSearch = screen.getByRole('img', { name: /imagessearch/i });
    userEvent.click(btnSearch);
    const inputSearch = screen.getByRole('textbox');
    userEvent.type(inputSearch, 'S ');
    const nomeRadio = screen.getByText(/primeira letra/i);
    userEvent.click(nomeRadio);
    const btnBusca = screen.getByRole('button', { name: /busca/i });
    userEvent.click(btnBusca);
    expect(inputSearch).toBeDefined();
  });
  it('Testa se a global alert é chamada quando digita dois caracteres ou mais ', async () => {
    global.alert = jest.fn();
    const { history } = renderWithRouter(<App />);
    history.push('/drinks');

    const btnSearch = screen.getByRole('img', { name: /imagessearch/i });
    userEvent.click(btnSearch);
    const inputSearch = screen.getByRole('textbox');
    userEvent.type(inputSearch, 'gg');
    const nomeRadio = screen.getByText(/primeira letra/i);
    userEvent.click(nomeRadio);
    const btnBusca = screen.getByRole('button', { name: /busca/i });
    userEvent.click(btnBusca);
    await waitFor(() => {
      expect(global.alert).toHaveBeenCalled();
    });
  });
  it('Se é chamado quando clicado no radio Name paginas são chamadas corretamente.', async () => {
    const { history } = renderWithRouter(<App />);
    history.push('/drinks');
    const searchTop = screen.getByRole('button', { name: /imagessearch/i });
    expect(searchTop).toBeInTheDocument();
    userEvent.click(searchTop);

    const inputSearch = screen.getByTestId('search-input');
    userEvent.type(inputSearch, 'Aquamarine');
    expect(inputSearch).toBeInTheDocument();
    const radioIngrediente = screen.getByText(/Nome/i);
    userEvent.click(radioIngrediente);
    expect(radioIngrediente).toBeInTheDocument();

    const busca = screen.getByText(/busca/i);
    userEvent.click(busca);
    const path = '/drinks/178319';
    await waitFor(() => {
      expect(history.location.pathname).toBe(path);
    });
  });
  it('Testa se a mensagem não é chamada ', async () => {
    global.alert = jest.fn();
    const { history } = renderWithRouter(<App />);
    history.push('/drinks');
    const searchTopBtn = screen.getByTestId('search-top-btn');
    userEvent.click(searchTopBtn);
    const fistLetter = screen.getByTestId('first-letter-search-radio');
    userEvent.click(fistLetter);
    const searchInputMeals = screen.getByTestId('search-input');
    userEvent.type(searchInputMeals, 'g');
    const exeSearch = screen.getByTestId('exec-search-btn');
    userEvent.click(exeSearch);
    await waitFor(() => {
      expect(global.alert).not.toHaveBeenCalled();
    });
  });
  it('Se todos os botões categorias estão definidos', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(drinkCategories).mockResolvedValueOnce(drinks),
    });
    const { history } = renderWithRouter(<App />);
    history.push('/meals');

    await waitFor(() => expect(global.fetch).toHaveBeenCalled());

    expect(screen.getByTestId('All-category-filter')).toBeDefined();
    expect(screen.getByTestId('Ordinary Drink-category-filter')).toBeDefined();
    expect(screen.getByTestId('Cocktail-category-filter')).toBeDefined();
    expect(screen.getByTestId('Shake-category-filter')).toBeDefined();
    expect(screen.getByTestId('Other/Unknown-category-filter')).toBeDefined();
    expect(screen.getByTestId('Cocoa-category-filter')).toBeDefined();
  });
  it('Se há alteração dos botões ', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(drinkCategories)
        .mockResolvedValueOnce(drinkIngredients),
    });
    const { history } = renderWithRouter(<App />);
    history.push('/drinks');
    await waitFor(() => expect(global.fetch).toHaveBeenCalled());
    const shakeCategory = await screen.findByRole('button', { name: /shake/i });
    userEvent.click(shakeCategory, 'Shake');
    expect(shakeCategory).toHaveValue('Shake');

    const coocktail = await screen.findByRole('button', { name: /cocktail/i });
    userEvent.click(coocktail);
    expect(coocktail).toHaveValue('Cocktail');

    const all = await screen.findByRole('button', { name: /all/i });
    userEvent.click(coocktail);
    expect(all).toHaveValue('All');
  });
});
