import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';
import fetchTotal from '../../cypress/mocks/fetch';
import meals from '../../cypress/mocks/meals';
import drinks from '../../cypress/mocks/drinks';
import oneDrink from '../../cypress/mocks/oneDrink';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';

const FAVORITE_RECIPES_PATH = '/favorite-recipes';

const mockDrink = [{
  id: '15997',
  type: 'drink',
  nationality: '',
  alcoholicOrNot: 'Optional alcohol',
  category: 'Ordinary Drink',
  name: 'GG',
  image: 'https://www.thecocktaildb.com/images/media/drink/vyxwut1468875960.jpg',

}, {
  alcoholicOrNot: '',
  category: 'Side',
  id: '52977',
  image: 'https://www.themealdb.com/images/media/meals/58oia61564916529.jpg',
  name: 'Corba',
  nationality: 'Turkish',
  type: 'meal',
},

];
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

  afterEach(() => jest.clearAllMocks());

  it('Testa se os botões estão funcionais  ', async () => {
    localStorage.setItem('favoriteRecipes', JSON.stringify(mockDrink));
    const { history } = renderWithRouter(<App />);
    history.push(FAVORITE_RECIPES_PATH);
    await waitFor(() => {
      const pageTitle = screen.getByTestId('page-title');
      const profileLink = screen.getByRole('button', { name: /profile/i });
      expect(pageTitle).toBeInTheDocument();
      expect(profileLink).toBeInTheDocument();

      const filterByAll = screen.getByTestId('filter-by-all-btn');
      const filterByMeal = screen.getByTestId('filter-by-meal-btn');
      const filterByDrink = screen.getByTestId('filter-by-drink-btn');
      expect(filterByAll).toBeInTheDocument();
      expect(filterByMeal).toBeInTheDocument();
      expect(filterByDrink).toBeInTheDocument();

      const coracao = screen.getByText(/gg/i);
      expect(coracao).toBeInTheDocument();
      userEvent.click(filterByMeal);
      expect(coracao).not.toBeInTheDocument();
      userEvent.click(filterByDrink);
    });
  });
  it('Se a receita esta favoritada ', async () => {
    jest.spyOn(global, 'fetch');
    localStorage.setItem('favoriteRecipes', JSON.stringify(mockDrink));
    const { history } = renderWithRouter(<App />);
    history.push(FAVORITE_RECIPES_PATH);
    await waitFor(() => {
      const imagemHorizontal = screen.getByTestId('0-horizontal-image');
      expect(imagemHorizontal).toBeInTheDocument();
      expect(imagemHorizontal).toHaveAttribute('src');

      const nameHorizontal = screen.getByTestId('0-horizontal-name');
      expect(nameHorizontal).toHaveTextContent('GG');

      const favoriteHorizontal = screen.getByTestId('0-horizontal-favorite-btn');
      expect(favoriteHorizontal).toBeInTheDocument();
      userEvent.click(favoriteHorizontal);
      expect(favoriteHorizontal).toHaveAttribute('src', whiteHeartIcon);

      const shareHorizontal = screen.getByTestId('0-horizontal-share-btn');
      expect(shareHorizontal).toBeInTheDocument();
      expect(shareHorizontal).toHaveAttribute('src');
      const textHorizontal = screen.getByTestId('0-horizontal-top-text');
      expect(textHorizontal).toBeInTheDocument();
    });
  });
  it('teste', async () => {
    jest.spyOn(global, 'fetch');
    localStorage.setItem('favoriteRecipes', JSON.stringify(mockDrink));
    const { history } = renderWithRouter(<App />);
    history.push(FAVORITE_RECIPES_PATH);
    await waitFor(() => {
      const recoverege = JSON.parse(localStorage.getItem('favoriteRecipes'));
      console.log(recoverege);
      const favoriteHorizontal1 = screen.getByTestId('1-horizontal-favorite-btn');
      expect(favoriteHorizontal1).toBeInTheDocument();
      userEvent.click(favoriteHorizontal1);
      expect(favoriteHorizontal1).not.toBeInTheDocument();
    });
  });
  it('testa se dá null', () => {
    jest.spyOn(global, 'fetch');

    const { history } = renderWithRouter(<App />);
    history.push(FAVORITE_RECIPES_PATH);
  });
});
