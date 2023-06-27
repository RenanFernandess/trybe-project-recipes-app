import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import App from '../App';

describe('Realiza os testes no componente Footer', () => {
  let returned;
  beforeEach(() => {
    returned = renderWithRouter(<App />);
    const { history } = returned;
    history.push('/meals');
  });

  test('Verifica se possui um rodapé na pagina com um botão para pagina de bebidas e outro para a de comidas', () => {
    const drinksButton = screen.getByRole('button', { name: /drinks button/i });
    const mealsButton = screen.getByRole('button', { name: /meals button/i });
    const footer = screen.getByRole('contentinfo');

    expect(drinksButton).toBeInTheDocument();
    expect(mealsButton).toBeInTheDocument();
    expect(footer).toBeInTheDocument();
  });

  test('Verifica se o botão drink redireciona para a pagina de bebidas', () => {
    const { history } = returned;

    const drinksButton = screen.getByRole('button', { name: /drinks button/i });
    userEvent.click(drinksButton);
    expect(history.location.pathname).toBe('/drinks');
    expect(screen.getByRole('heading', { name: /drinks drinks/i })).toBeInTheDocument();
  });
  test('Verifica se o botão meals redireciona para a pagina de comidas', () => {
    const { history } = returned;

    const mealsButton = screen.getByRole('button', { name: /meals button/i });
    userEvent.click(mealsButton);
    expect(history.location.pathname).toBe('/meals');
    expect(screen.getByRole('heading', { name: /meals meals/i })).toBeInTheDocument();
  });
});
