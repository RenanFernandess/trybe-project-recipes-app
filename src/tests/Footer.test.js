import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import Meals from '../pages/Meals';

describe('Realiza os testes no componente Footer', () => {
  let returned;
  beforeEach(() => {
    returned = renderWithRouter(<Meals />);
  });

  test('Verifica se os elementos esperados existem na tela', () => {
    const drinksIcon = screen.getByTestId('drinks-bottom-btn');
    const mealsIcon = screen.getByTestId('meals-bottom-btn');
    const footer = screen.getByTestId('footer');

    expect(drinksIcon).toBeInTheDocument();
    expect(mealsIcon).toBeInTheDocument();
    expect(footer).toBeInTheDocument();
    expect(drinksIcon).toHaveAttribute('src', 'drinkIcon.svg');
    expect(mealsIcon).toHaveAttribute('src', 'mealIcon.svg');
  });

  test('Verifica o icone de drink faz o redirec correto', () => {
    const { history } = returned;
    const drinksIcon = screen.getByTestId('drinks-bottom-btn');
    userEvent.click(drinksIcon);
    expect(history.location.pathname).toBe('/drinks');
  });
  test('Verifica o icone de drink faz o redirec correto', () => {
    const { history } = returned;
    const mealsIcon = screen.getByTestId('meals-bottom-btn');
    userEvent.click(mealsIcon);
    expect(history.location.pathname).toBe('/meals');
  });
});
