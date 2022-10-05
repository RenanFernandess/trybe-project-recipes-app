import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import fetchTotal from '../../cypress/mocks/fetch';
import mealCategories from '../../cypress/mocks/mealCategories';
import oneMeal from '../../cypress/mocks/oneMeal';
import App from '../App';

describe('Testa o Reciper', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(fetchTotal)
        .mockResolvedValueOnce(mealCategories)
        .mockResolvedValueOnce(oneMeal),
    });
  });

  afterEach(() => jest.clearAllMocks());
  it('Testa os retornos Ingredientes/Meals ', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/meals');

    const btnSearch = screen.getByRole('img', { name: /imagessearch/i });
    userEvent.click(btnSearch);
    const inputSearch = screen.getByRole('textbox');
    userEvent.type(inputSearch, 'Arrabiata');
    const nomeRadio = screen.getByText(/ingredientes/i);
    userEvent.click(nomeRadio);
    const btnBusca = screen.getByRole('button', { name: /busca/i });
    userEvent.click(btnBusca);
    expect(inputSearch).toHaveValue('Arrabiata');
  });

  it('Testa os retornos firstLetter/Meals ', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/meals');

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
  it('Testa os retornos da mensagem ', async () => {
    global.alert = jest.fn();
    const { history } = renderWithRouter(<App />);
    history.push('/meals');

    const btnSearch = screen.getByRole('img', { name: /imagessearch/i });
    userEvent.click(btnSearch);
    const inputSearch = screen.getByRole('textbox');
    userEvent.type(inputSearch, 'oo');
    const nomeRadio = screen.getByText(/primeira letra/i);
    userEvent.click(nomeRadio);
    const btnBusca = screen.getByRole('button', { name: /busca/i });
    userEvent.click(btnBusca);
    await waitFor(() => {
      expect(global.alert).toHaveBeenCalled();
    });
  });
  it('Ultimo retorno do método', async () => {
    global.alert = jest.fn();
    const { history } = renderWithRouter(<App />);
    history.push('/meals');
    const searchTopBtn = screen.getByTestId('search-top-btn');
    userEvent.click(searchTopBtn);
    const fistLetter = screen.getByTestId('first-letter-search-radio');
    userEvent.click(fistLetter);
    const searchInputMeals = screen.getByTestId('search-input');
    userEvent.type(searchInputMeals, 'k');
    const exeSearch = screen.getByTestId('exec-search-btn');
    userEvent.click(exeSearch);
    await waitFor(() => {
      expect(global.alert).not.toHaveBeenCalled();
    });
  });
});
