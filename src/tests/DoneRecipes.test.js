import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';

const mockDrink = [{
  id: '15997',
  type: 'drink',
  nationality: '',
  alcoholicOrNot: 'Optional alcohol',
  category: 'Ordinary Drink',
  name: 'GG',
  image: 'https://www.thecocktaildb.com/images/media/drink/vyxwut1468875960.jpg',
  doneDate: '04/10/2022,',
  tags: [],

}, {
  alcoholicOrNot: '',
  category: 'Side',
  id: '52977',
  image: 'https://www.themealdb.com/images/media/meals/58oia61564916529.jpg',
  name: 'Corba',
  nationality: 'Turkish',
  type: 'meal',
  doneDate: '04/10/2022',
  tags: ['Soup'],
},

];
describe('Testa o FavoriteRecipes', () => {
  it('Testa se os botões estão funcionais  ', async () => {
    localStorage.setItem('doneRecipes', JSON.stringify(mockDrink));
    const { history } = renderWithRouter(<App />);
    history.push('/done-recipes');

    const filterByAll = screen.getByTestId('filter-by-all-btn');
    const filterByMeal = screen.getByTestId('filter-by-meal-btn');
    const filterByDrink = screen.getByTestId('filter-by-drink-btn');
    expect(filterByAll).toBeInTheDocument();
    expect(filterByMeal).toBeInTheDocument();
    expect(filterByDrink).toBeInTheDocument();
    userEvent.click(filterByAll);
    await waitFor(() => {
      const coracao = screen.getByText(/gg/i);
      const corba = screen.getByText(/corba/i);
      expect(coracao).toBeInTheDocument();
      expect(corba).toBeInTheDocument();
    });
  });
  it.skip('Se a receita esta favoritada ', async () => {
    jest.spyOn(global, 'fetch');
    localStorage.setItem('doneRecipes', JSON.stringify(mockDrink));
    const { history } = renderWithRouter(<App />);
    history.push('/done-recipes');
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
});
