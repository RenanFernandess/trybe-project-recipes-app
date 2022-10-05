import React from 'react';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';
import fetchTotal from '../../cypress/mocks/fetch';
import meals from '../../cypress/mocks/meals';
import drinks from '../../cypress/mocks/drinks';
import oneDrink from '../../cypress/mocks/oneDrink';

describe('Testa o FavoriteRecipes', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(fetchTotal)
        .mockResolvedValueOnce(meals)
        .mockResolvedValueOnce(drinks)
        .mockResolvedValueOnce(oneDrink),
    });
  });
  it('Testa se os botões estão funcionais  ', async () => {
    localStorage.setItem('doneRecipes', JSON.stringify(mockDrink));
    const { history } = renderWithRouter(<App />);
    history.push('/done-recipes');
  });
});
