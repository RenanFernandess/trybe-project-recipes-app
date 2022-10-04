import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';
import fetchTotal from '../../cypress/mocks/fetch';
import meals from '../../cypress/mocks/meals';
import drinks from '../../cypress/mocks/drinks';
// import drinkCategories from '../../cypress/mocks/drinkCategories';
// import oneDrink from '../../cypress/mocks/oneDrink';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

const mockDrink = [{
  id: '15997',
  type: 'drink',
  nationality: '',
  alcoholicOrNot: 'Optional alcohol',
  category: 'Ordinary Drink',
  name: 'GG',
  image: 'https://www.thecocktaildb.com/images/media/drink/vyxwut1468875960.jpg',

}];

describe('Testa o FavoriteRecipes', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(fetchTotal)
        .mockResolvedValueOnce(meals)
        .mockResolvedValueOnce(drinks),
      // .mockResolvedValueOnce(oneDrink),
    });
  });

  afterEach(() => jest.clearAllMocks());

  it('Testa se a receita é favoritada ', async () => {
    localStorage.setItem('favoriteRecipes', JSON.stringify(mockDrink));
    const { history } = renderWithRouter(<App />);
    history.push('/favorite-recipes');
    const filterByAll = screen.getByTestId('filter-by-all-btn');
    const filterByMeal = screen.getByTestId('filter-by-meal-btn');
    const filterByDrink = screen.getByTestId('filter-by-drink-btn');
    const imagemHorizontal = await screen.findBytestId('0-horizontal-image');
    const textHorizontal = await screen.findBytestId('0-horizontal-top-text');
    const nameHorizontal = await screen.findBytestId('0-horizontal-name');
    const shareHorizontal = await screen.findBytestId('0-horizontal-share-btn');
    const favoriteHorizontal = await screen.findBytestId('0-horizontal-favorite-btn');
    expect(textHorizontal).toBeInTheDocument();
    expect(textHorizontal).toBeInTheDocument();

    expect(filterByAll).toBeInTheDocument();
    expect(filterByMeal).toBeInTheDocument();
    expect(filterByDrink).toBeInTheDocument();

    const valueText = 'Ordinary Drink Optional alcohol';
    expect(imagemHorizontal).toBeInTheDocument();
    expect(nameHorizontal).toBeInTheDocument();
    expect(shareHorizontal).toBeInTheDocument();
    expect(favoriteHorizontal).toBeInTheDocument();
    expect(imagemHorizontal).toHaveAttribute('src');
    expect(textHorizontal).toHaveTextContent(valueText);
    expect(shareHorizontal).toHaveAttribute('src');
    expect(favoriteHorizontal).toHaveAttribute('src', blackHeartIcon);
    expect(favoriteHorizontal).toHaveAttribute('src', blackHeartIcon);

    userEvent.click(filterByAll);
    userEvent.click(filterByMeal);
    userEvent.click(filterByDrink);
    userEvent.click(favoriteHorizontal);
    userEvent.click(imagemHorizontal);
    userEvent.click(shareHorizontal);
  });
});
