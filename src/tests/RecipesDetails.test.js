import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import oneMeal from '../../cypress/mocks/oneMeal';
import fetchTotal from '../../cypress/mocks/fetch';
import oneDrink from '../../cypress/mocks/oneDrink';
import meals from '../../cypress/mocks/meals';
import App from '../App';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

const objeto = [{
  id: '52771',
  type: 'meal',
  nationality: 'Italian',
  category: 'Vegetarian',
  alcoholicOrNot: '',
  name: 'Spicy Arrabiata Penne',
  image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
}];
const mockDrink = [{
  id: '15997',
  type: 'drink',
  nationality: '',
  alcoholicOrNot: 'Optional alcohol',
  category: 'Ordinary Drink',
  name: 'GG',
  image: 'https://www.thecocktaildb.com/images/media/drink/vyxwut1468875960.jpg',

}];

const PATH = '/meals/52771';

describe('Testa o Reciper', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn()
        .mockResolvedValue(fetchTotal)
        .mockResolvedValueOnce(oneMeal)
        .mockResolvedValueOnce(meals)
        .mockResolvedValueOnce(oneDrink),
    });
    global.localStorage = jest.fn(saveItem);
  });
  afterEach(() => jest.clearAllMocks());

  it('Testa o local storage', async () => {
    const localStorageMock = {
      getItem: jest.fn(),
      setItem: jest.fn(),
      clear: jest.fn(),
    };
    global.localStorage = localStorageMock;
    localStorage.setItem('FavoriteRecipes', JSON.stringify(objeto));

    const { history } = renderWithRouter(<App />);
    history.push(PATH);

    console.log(history.location.pathname);

    const favoriteBtn = await screen.findByTestId('favorite-btn');
    expect(favoriteBtn).toBeInTheDocument();
    const teste = JSON.parse(localStorage.getItem('FavoriteRecipes'));
    userEvent.click(favoriteBtn);
    expect(teste).toHaveLength(1);
  });
  it('Testa os botões ', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/meals');
    const drinksBtn = screen.getByTestId('drinks-bottom-btn');
    const mealsBtn = screen.getByTestId('meals-bottom-btn');
    expect(drinksBtn).toBeInTheDocument();
    expect(mealsBtn).toBeInTheDocument();
    userEvent.click(drinksBtn);
    userEvent.click(mealsBtn);
    history.push('/done-recipes');
    const filterByAll = screen.getByTestId('filter-by-all-btn');
    const filterByMeal = screen.getByTestId('filter-by-meal-btn');
    const filterByDrink = screen.getByTestId('filter-by-drink-btn');
    expect(filterByAll).toBeInTheDocument();
    expect(filterByMeal).toBeInTheDocument();
    expect(filterByDrink).toBeInTheDocument();
    userEvent.click(filterByAll);
    userEvent.click(filterByMeal);
    userEvent.click(filterByDrink);
  });
  it('Se aparece as receitas em progresso', async () => {
    const localStorageMock = {
      getItem: jest.fn(),
      setItem: jest.fn(),
      clear: jest.fn(),
    };
    global.localStorage = localStorageMock;
    localStorage.setItem('inProgressRecipes', JSON.stringify(objeto));

    const { history } = renderWithRouter(<App />);
    history.push('/meals/PATH');
    const startRecipe = await screen.findByTestId('start-recipe-btn');
    userEvent.click(startRecipe);
    expect(favoriteBtn).toBeInTheDocument();
    const transforme = JSON.parse(localStorage.getItem('inProgressRecipes'));
    userEvent.click(favoriteBtn);
    expect(transforme).toHaveLength(1);
  });
  it('Testa se o link é copiado', async () => {
    const { history } = renderWithRouter(<App />);
    history.push('/meals/52771');
    Object.assign(navigator, {
      clipboard: {
        writeText: () => { 'Link copied!'; },
      },
    });
    jest.spyOn(navigator.clipboard, 'writeText');
    const shareBtn = screen.getByTestId('share-btn');
    userEvent.click(shareBtn);
    const message = screen.getByText(/link copied!/i);
    expect(message).toBeInTheDocument();
    const URL = 'http://localhost:3000/meals/52771';
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(URL);
  });
  it('Salvar nos favoritos', async () => {
    const localStorageMock = {
      getItem: jest.fn(),
      setItem: jest.fn(),
      clear: jest.fn(),
    };
    global.localStorage = localStorageMock;
    localStorage.setItem('favoriteRecipes', JSON.stringify(mockDrink));

    const { history } = renderWithRouter(<App />);
    history.push('/drinks/15997');
    const favorite = await screen.getByTestId('favorite-btn');
    expect(favorite).toHaveAttribute('src', blackHeartIcon);
    userEvent.click(favorite);
    expect(favorite).toHaveAttribute('src', whiteHeartIcon);
    const transforme = JSON.parse(localStorage.getItem('favoriteRecipes'));
    expect(transforme).toHaveLength(0);
  });
});
