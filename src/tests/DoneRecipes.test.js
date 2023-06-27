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

    const filterByAll = screen.getByRole('img', { name: /all categories button/i });
    const filterByMeal = screen.getByRole('img', { name: /meals categories button/i });
    const filterByDrink = screen.getByRole('img', { name: /drinks categories button/i });
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
  it('Testa se renderia o carde da receita feita', async () => {
    localStorage.setItem('doneRecipes', JSON.stringify(mockDrink));
    const { history } = renderWithRouter(<App />);
    history.push('/done-recipes');
    const imagemHorizontal = screen.getAllByRole('img', { name: /recipe image/i })[0];
    expect(imagemHorizontal).toBeInTheDocument();
    expect(imagemHorizontal).toHaveAttribute('src');

    const nameHorizontal = screen.getByText(/GG/i);
    expect(nameHorizontal).toBeInTheDocument();

    const shareButtons = screen.getAllByRole('button', { name: /share button/i });
    expect(shareButtons.length).toBe(2);
    expect(shareButtons[0]).toBeInTheDocument();

    const category = screen.getByText(/Ordinary Drink Optional alcohol/i);
    expect(category).toBeInTheDocument();
  });
});
